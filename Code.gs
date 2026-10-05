/**
 * Penerima data Refleksi, Pengumpulan LKM, dan Digital Case Investigation (DCI)
 * dari website RuangBelajar.
 *
 * Spreadsheet ID: 1VpHkT8f9e_MAUSqVJWwVDZ2yCYO5qfqyahRNxJRQDV4
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

// SHEET NAMA KHUSUS UNTUK DATA DIGITAL CASE INVESTIGATION
const DCI_SHEET_NAME = 'DCI - IPO Hardware Software SO';
const DCI_HEADERS = [
  'Waktu Kirim',
  'Materi',
  'Nama',
  'Kelas',
  'Bukti Digunakan',
  'Pilihan Source Challenge',
  'Alasan Source Challenge',
  'Analisis Masalah & Hardware',
  'Analisis Software & SO',
  'Penyebab Utama (Decision)',
  'Rekomendasi Utama',
  'Refleksi Perubahan Evaluasi',
  'Refleksi Tanggung Jawab (CASEL)',
  'JSON Data Lengkap'
];
const FLOWCHART_DCI_SHEET_NAME = 'DCI_Flowchart';
const FLOWCHART_DCI_HEADERS = [
  'Waktu Kirim',
  'Nama',
  'Kelas',
  'Kelompok',
  'Kasus',
  'Evaluasi',
  'Solusi',
  'Refleksi',
  'Materi',
  'Nama Anggota',
  'Konsep Kasus',
  'Tingkat Kesulitan',
  'Analisis Masalah',
  'Tujuan Proses',
  'Langkah Kasus',
  'Kondisi / Perulangan',
  'IPO - Input',
  'IPO - Proses',
  'IPO - Output',
  'IPO - Decision',
  'IPO - Perulangan',
  'Algoritma',
  'Flowchart',
  'Tracing - Input Uji',
  'Tracing - Jalur',
  'Tracing - Kesesuaian',
  'Tracing - Decision',
  'Evaluasi - Kelemahan',
  'Solusi Final',
  'Alasan Solusi',
  'Refleksi - Pemahaman',
  'Refleksi - Kesulitan',
  'Refleksi - Kolaborasi',
  'JSON Data Lengkap'
];

function doPost(event) {
  let data = {};
  try {
    data = JSON.parse(event.postData.contents || '{}');
    if (data.action === 'saveFlowchartDCI' || data.type === 'dci_flowchart') {
      return saveFlowchartDci(data);
    } else if (data.type === 'lkm') {
      return saveLkm(data);
    } else if (data.type === 'dci') {
      return saveDci(data);
    } else {
      return saveReflection(data);
    }
  } catch (error) {
    console.error(`${data.type || 'kiriman'} gagal: ${error.message}`);
    if (data.type === 'lkm') {
      logLkm(data, '', '', `Gagal: ${error.message}`);
    }
    return response({ ok: false, message: 'Gagal menyimpan kiriman: ' + error.message });
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

function saveDci(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet(spreadsheet, DCI_SHEET_NAME, DCI_HEADERS);

  const evidenceText = Array.isArray(data.evidenceUsed) ? data.evidenceUsed.join('; ') : sanitize(data.evidenceUsed);

  const values = [
    new Date(),
    sanitize(data.materi || 'IPO, Hardware, Software, dan Sistem Operasi'),
    sanitize(data.nama),
    sanitize(data.kelas),
    evidenceText,
    sanitize(data.sourceChallengeChoice),
    sanitize(data.sourceChallengeReason),
    sanitize(`Masa: ${data.analysisProblem || '-'}\nHW: ${data.analysisHardware || '-'}`),
    sanitize(`SW: ${data.analysisSoftware || '-'}\nSO: ${data.analysisOS || '-'}`),
    sanitize(data.decisionCause),
    sanitize(data.decisionRecommendation),
    sanitize(data.reflectionChange),
    sanitize(data.reflectionResponsibility),
    JSON.stringify(data)
  ];

  sheet.appendRow(values);
  return response({ ok: true, message: 'Data DCI berhasil disimpan.' });
}

function saveFlowchartDci(data) {
  const nama = sanitize(data.nama);
  const kelas = sanitize(data.kelas);
  const kelompok = sanitize(data.kelompok);
  const kasus = sanitize(data.kasus);
  if (!nama || !kelas || !kelompok || !kasus) {
    return response({ ok: false, message: 'Identitas kelompok dan kasus wajib diisi.' });
  }

  const analisis = data.analisis || {};
  const ipo = data.ipo || {};
  const tracing = data.tracing || {};
  const evaluasi = data.evaluasi || {};
  const refleksi = data.refleksi || {};
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet(spreadsheet, FLOWCHART_DCI_SHEET_NAME, FLOWCHART_DCI_HEADERS);
  ensureFlowchartDciHeaders(sheet);

  sheet.appendRow([
    new Date(),
    nama,
    kelas,
    kelompok,
    kasus,
    sanitize(evaluasi.kelemahan),
    sanitize(evaluasi.solusi),
    sanitize(refleksi.pemahaman),
    'Materi 6 - Flowchart',
    sanitize(data.anggota),
    sanitize(data.konsep),
    sanitize(data.tingkat),
    sanitize(analisis.masalah),
    sanitize(analisis.tujuan),
    sanitize(analisis.langkah),
    sanitize(analisis.kondisi),
    sanitize(ipo.input),
    sanitize(ipo.proses),
    sanitize(ipo.output),
    sanitize(ipo.decision),
    sanitize(ipo.loop),
    JSON.stringify(Array.isArray(data.algoritma) ? data.algoritma : []),
    JSON.stringify(data.flowchart || { nodes: [], connections: [] }),
    sanitize(tracing.input),
    sanitize(tracing.jalur),
    sanitize(tracing.sesuai),
    sanitize(tracing.decision),
    sanitize(evaluasi.kelemahan),
    sanitize(evaluasi.solusi),
    sanitize(evaluasi.alasan),
    sanitize(refleksi.pemahaman),
    sanitize(refleksi.kesulitan),
    sanitize(refleksi.kolaborasi),
    JSON.stringify(data)
  ]);

  return response({ ok: true, message: 'Data DCI Flowchart berhasil disimpan.' });
}

function saveLkm(data) {
  const materialNumber = materialNumberFor(data.materi);
  const folderId = LKM_FOLDERS_BY_MATERIAL[materialNumber];
  
  if (!folderId) {
    logLkm(data, '', '', 'Gagal: Folder materi tidak ditemukan');
    return response({ ok: false, message: 'Folder materi tidak ditemukan.' });
  }

  try {
    const folder = DriveApp.getFolderById(folderId);
    const extension = (data.file.name.split('.').pop() || '').toLowerCase();
    const mimeType = ALLOWED_LKM_MIME_TYPES[extension];

    if (!mimeType) {
      logLkm(data, folder.getName(), '', 'Gagal: Format file tidak diizinkan');
      return response({ ok: false, message: 'Format file tidak diizinkan.' });
    }

    const bytes = Utilities.base64Decode(data.file.base64);
    if (bytes.length > MAX_LKM_BYTES) {
      logLkm(data, folder.getName(), '', 'Gagal: Ukuran file melebihi 10 MB');
      return response({ ok: false, message: 'Ukuran file melebihi batas.' });
    }

    const formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    const newFileName = `Materi${materialNumber}_${sanitize(data.kelas)}_${sanitize(data.nama)}_${formattedDate}.${extension}`;

    const blob = Utilities.newBlob(bytes, mimeType, newFileName);
    const createdFile = folder.createFile(blob);
    const fileUrl = createdFile.getUrl();

    logLkm(data, folder.getName(), fileUrl, 'Berhasil');
    return response({ ok: true, fileUrl: fileUrl });
  } catch (err) {
    logLkm(data, '', '', `Gagal: ${err.message}`);
    return response({ ok: false, message: err.message });
  }
}

function logLkm(data, folderName, fileUrl, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet(spreadsheet, LKM_LOG_SHEET, LKM_LOG_HEADERS);
    sheet.appendRow([
      new Date(),
      sanitize(data.materi),
      sanitize(data.nama),
      sanitize(data.kelas),
      sanitize(data.file ? data.file.name : '-'),
      folderName || '-',
      fileUrl || '-',
      status
    ]);
  } catch (e) {
    console.error('Gagal mencatat log LKM:', e.message);
  }
}

function getOrCreateSheet(spreadsheet, sheetName, customHeaders) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(customHeaders || HEADERS);
  }
  return sheet;
}

function ensureFlowchartDciHeaders(sheet) {
  const existingColumnCount = sheet.getLastColumn();
  if (existingColumnCount < FLOWCHART_DCI_HEADERS.length) {
    const missingHeaders = FLOWCHART_DCI_HEADERS.slice(existingColumnCount);
    sheet.getRange(1, existingColumnCount + 1, 1, missingHeaders.length).setValues([missingHeaders]);
  }
}

function sheetNameForMaterial(materiName) {
  const num = materialNumberFor(materiName);
  return SHEETS_BY_MATERIAL[num] || UNRECOGNIZED_SHEET;
}

function materialNumberFor(materiName) {
  const match = String(materiName || '').match(/Materi\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
}

function sanitize(text) {
  return String(text || '').trim();
}

function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function buatSemuaSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.values(SHEETS_BY_MATERIAL).forEach((name) => getOrCreateSheet(spreadsheet, name));
  getOrCreateSheet(spreadsheet, UNRECOGNIZED_SHEET);
  getOrCreateSheet(spreadsheet, LKM_LOG_SHEET, LKM_LOG_HEADERS);
  getOrCreateSheet(spreadsheet, DCI_SHEET_NAME, DCI_HEADERS);
  ensureFlowchartDciHeaders(getOrCreateSheet(spreadsheet, FLOWCHART_DCI_SHEET_NAME, FLOWCHART_DCI_HEADERS));
}
