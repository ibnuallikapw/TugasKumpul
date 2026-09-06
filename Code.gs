/**
 * Penerima refleksi dan pengumpulan LKM dari website RuangBelajar.
 *
 * Cara pakai:
 * 1. Buka spreadsheet tujuan, lalu pilih Extensions > Apps Script.
 * 2. Ganti isi file Code.gs di editor dengan seluruh kode ini dan simpan.
 * 3. Klik Deploy > New deployment > Web app.
 * 4. Jalankan sebagai: Me. Akses: Anyone.
 * 5. Salin URL Web app hasil deployment ke GOOGLE_APPS_SCRIPT_URL pada script.js.
 */
const SPREADSHEET_ID = '1VpHkT8f9e_MAUSqVJWwVDZ2yCYO5qfqyahRNxJRQDV4';
const HEADERS = ['Waktu Kirim', 'Materi', 'Nama', 'Kelas', 'Refleksi'];
const SHEETS_BY_MATERIAL = {
  1: 'Refleksi IPO-Hardware-Software-SO',
  2: 'Refleksi Konsep Dasar AI',
  3: 'Refleksi Mesin Pencari & Evaluasi Sumber',
  4: 'Refleksi Aplikasi Produktivitas AI & Infografis',
  5: 'Refleksi Portofolio & Review Materi',
};
const UNRECOGNIZED_SHEET = 'Refleksi Data Perlu Ditinjau';
const LKM_FOLDERS_BY_MATERIAL = {
  1: '13-4apl66UD7U85FuOAdTYRxYLtklTtLD',
  2: '1uAcTqys0SCzelMZBUAjE6hY6BDzdvb7j',
  3: '1DA7ig1fU26gau2E3hNb467MhzawMKVlR',
  4: '1hKq07NqAIcmD1Cza8Qmk_eIh5XALTfwd',
  5: '17Gmg-CcQ9sZnL_udAmDG4eZ0Vi06U5sb',
};
const ALLOWED_LKM_MIME_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
const MAX_LKM_BYTES = 10 * 1024 * 1024;
const LKM_LOG_SHEET = 'Log Pengumpulan LKM';
const LKM_LOG_HEADERS = ['Waktu Kirim', 'Materi', 'Nama', 'Kelas', 'Nama File', 'Folder Tujuan', 'Tautan File', 'Status'];

function doPost(event) {
  let data = {};
  try {
    data = JSON.parse(event.postData.contents || '{}');
    return data.type === 'lkm' ? saveLkm(data) : saveReflection(data);
  } catch (error) {
    console.error(`${data.type || 'kiriman'} gagal: ${error.message}`);
    if (data.type === 'lkm') {
      logLkm(data, '', '', `Gagal: ${error.message}`);
    }
    return response({ ok: false, message: 'Gagal menyimpan kiriman.' });
  }
}

function saveReflection(data) {
  const values = [
    new Date(),
    sanitize(data.materi),
    sanitize(data.nama),
    sanitize(data.kelas),
    sanitize(data.refleksi),
  ];

  if (values.slice(1).some((value) => !value)) {
    return response({ ok: false, message: 'Data refleksi belum lengkap.' });
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet(spreadsheet, sheetNameForMaterial(data.materi));
  sheet.appendRow(values);
  return response({ ok: true });
}

function saveLkm(data) {
  const materialNumber = materialNumberFor(data.materi);
  const folderId = LKM_FOLDERS_BY_MATERIAL[materialNumber];
  const file = data.file || {};
  const extension = getFileExtension(file.name);
  const bytes = Utilities.base64Decode(String(file.base64 || ''));

  if (!sanitize(data.nama) || !sanitize(data.kelas) || !extension || !ALLOWED_LKM_MIME_TYPES[extension] || !bytes.length) {
    return response({ ok: false, message: 'Data atau format file LKM tidak valid.' });
  }
  if (bytes.length > MAX_LKM_BYTES) {
    return response({ ok: false, message: 'Ukuran file LKM maksimal 10 MB.' });
  }

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const fileName = [
    `LKM-Materi-${materialNumber}`,
    safeFilePart(data.nama),
    safeFilePart(data.kelas),
    timestamp,
    safeFilePart(file.name),
  ].join('_');
  const blob = Utilities.newBlob(bytes, ALLOWED_LKM_MIME_TYPES[extension], fileName);
  const folder = DriveApp.getFolderById(folderId);
  const uploadedFile = folder.createFile(blob);
  logLkm(data, folder.getName(), uploadedFile.getUrl(), 'Berhasil');
  console.log(`LKM berhasil: ${uploadedFile.getUrl()}`);
  return response({ ok: true });
}

function materialNumberFor(material) {
  const match = String(material || '').match(/materi\s*([1-5])/i);
  const materialNumber = match && match[1];
  if (!materialNumber || !SHEETS_BY_MATERIAL[materialNumber]) {
    throw new Error('Materi tidak dikenali. Kiriman tidak disimpan.');
  }
  return materialNumber;
}

function sheetNameForMaterial(material) {
  return SHEETS_BY_MATERIAL[materialNumberFor(material)];
}

function getOrCreateSheet(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return sheet;
}

function logLkm(data, folderName, fileUrl, status) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(LKM_LOG_SHEET) || spreadsheet.insertSheet(LKM_LOG_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(LKM_LOG_HEADERS);
    sheet.getRange(1, 1, 1, LKM_LOG_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, LKM_LOG_HEADERS.length);
  }
  sheet.appendRow([
    new Date(),
    sanitize(data.materi),
    sanitize(data.nama),
    sanitize(data.kelas),
    sanitize(data.file && data.file.name),
    folderName,
    fileUrl,
    status,
  ]);
}

// Jalankan fungsi ini SATU KALI dari editor untuk membuat semua tab lebih dahulu.
// Jangan menjalankan doPost secara manual karena fungsi itu hanya untuk kiriman website.
function buatSemuaSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.values(SHEETS_BY_MATERIAL).forEach((sheetName) => {
    getOrCreateSheet(spreadsheet, sheetName);
  });
}

// Jalankan fungsi ini untuk memastikan akun yang deploy memiliki akses ke semua folder LKM.
// Fungsi ini tidak membuat, mengubah, atau menghapus file apa pun.
function cekAksesFolderLKM() {
  Object.keys(LKM_FOLDERS_BY_MATERIAL).forEach((materialNumber) => {
    const folder = DriveApp.getFolderById(LKM_FOLDERS_BY_MATERIAL[materialNumber]);
    console.log(`Materi ${materialNumber}: ${folder.getName()}`);
  });
}

// Jalankan sekali untuk memunculkan izin MENULIS ke Google Drive.
// Fungsi ini membuat file uji kosong di folder Materi 1 lalu langsung memindahkannya ke Sampah.
function aktifkanIzinUploadLKM() {
  const folder = DriveApp.getFolderById(LKM_FOLDERS_BY_MATERIAL[1]);
  const testFile = folder.createFile('uji-izin-upload-lkm.txt', 'File uji izin Apps Script.');
  testFile.setTrashed(true);
  console.log('Izin upload Google Drive berhasil diaktifkan.');
}

// Opsional: memindahkan data lama yang sempat tercampur di tab Materi 1.
// Aman dijalankan kembali; setelah dipindahkan, baris Materi 2-5 tidak lagi ada di tab Materi 1.
function pindahkanDataLamaKeSheetMateri() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sourceSheet = spreadsheet.getSheetByName(SHEETS_BY_MATERIAL[1]);
  if (!sourceSheet || sourceSheet.getLastRow() < 2) return;

  const rows = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, HEADERS.length).getValues();
  const retainedRows = [];

  rows.forEach((row) => {
    let targetSheetName;
    try {
      targetSheetName = sheetNameForMaterial(row[1]);
    } catch (error) {
      // Data uji lama yang tidak punya label "Materi 1" s.d. "Materi 5"
      // dipindahkan agar tidak menghalangi pemisahan refleksi yang valid.
      targetSheetName = UNRECOGNIZED_SHEET;
    }
    if (targetSheetName === sourceSheet.getName()) {
      retainedRows.push(row);
      return;
    }
    getOrCreateSheet(spreadsheet, targetSheetName).appendRow(row);
  });

  sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, HEADERS.length).clearContent();
  if (retainedRows.length) {
    sourceSheet.getRange(2, 1, retainedRows.length, HEADERS.length).setValues(retainedRows);
  }
}

function sanitize(value) {
  const text = String(value || '').trim();
  // Mencegah isi refleksi terbaca sebagai formula spreadsheet.
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function getFileExtension(fileName) {
  const match = String(fileName || '').toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : '';
}

function safeFilePart(value) {
  return String(value || 'tanpa-nama')
    .trim()
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .slice(0, 80) || 'tanpa-nama';
}

function response(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
