# Folder aset

Letakkan modul PDF di folder ini dengan nama berikut agar tautan contoh pada halaman berfungsi:

- `/Users/user/Documents/TesterKumpul/Materi/Materi IPO,Hardware,Software,SO.pptx`
- `/Users/user/Documents/TesterKumpul/Materi/Materi Konsep Dasar AI.pptx`
- `/Users/user/Documents/TesterKumpul/Materi/Materi Mensin Pencari.pptx`
- `materi-04.pdf`
- `materi-05.pdf`

Anda juga dapat mengganti nilai `href` pada tautan materi di `index.html` dengan URL Google Drive, Google Form, atau situs lain yang digunakan sekolah.

## Menyimpan refleksi ke Google Spreadsheet

File `Code.gs` sudah disiapkan untuk spreadsheet refleksi individu materi IPO, Hardware, Software, dan Sistem Operasi berikut:

`1VpHkT8f9e_MAUSqVJWwVDZ2yCYO5qfqyahRNxJRQDV4`

1. Buka spreadsheet lalu pilih **Extensions > Apps Script**.
2. Hapus isi editor dan tempel seluruh isi dari `Code.gs`, kemudian simpan.
3. Pilih **Deploy > New deployment > Web app**. Atur **Execute as: Me** dan **Who has access: Anyone**, lalu pilih **Deploy**. Setujui izin Google yang muncul.
4. Salin URL yang dihasilkan (harus berakhir dengan `/exec`).
5. Pada `script.js`, ganti teks `PASTE_URL_WEB_APP_APPS_SCRIPT_DI_SINI` dengan URL tersebut.

Setiap refleksi akan otomatis masuk ke sheet sesuai materinya, lengkap dengan waktu kirim, materi, nama, kelas, dan isi refleksi:

- **Refleksi IPO-Hardware-Software-SO**
- **Refleksi Konsep Dasar AI**
- **Refleksi Mesin Pencari & Evaluasi Sumber**
- **Refleksi Aplikasi Produktivitas AI & Infografis**
- **Refleksi Portofolio & Review Materi**

Setelah mengganti kode pada Apps Script, pilih fungsi **buatSemuaSheet** pada menu fungsi di bagian atas editor, lalu klik **Run** satu kali. Fungsi ini hanya membuat kelima tab tersebut. Jangan menjalankan `doPost` secara manual.

Untuk memisahkan data lama yang sudah terlanjur bercampur di tab pertama, jalankan sekali fungsi **pindahkanDataLamaKeSheetMateri**. Fungsi ini memindahkan baris Materi 2 sampai 5 ke tab materi masing-masing dan menyisakan data Materi 1 di tab pertama. Baris uji lama yang tidak memiliki label `Materi 1` sampai `Materi 5` akan dipindahkan ke tab **Refleksi Data Perlu Ditinjau**, sehingga tidak ada data yang hilang.

Jika Web App sudah pernah dideploy, pilih **Deploy > Manage deployments**, edit deployment yang ada, pilih versi baru, lalu deploy ulang. URL `/exec` yang sudah dipasang pada website tetap dapat digunakan.

## Pengumpulan LKM ke Google Drive

Formulir LKM sekarang menerima PDF, DOC, dan DOCX hingga 10 MB. Website meminta nama dan kelas sebelum file diunggah, lalu Apps Script memberi nama file berdasarkan materi, nama, kelas, waktu pengiriman, dan nama file asli. Setiap materi langsung disimpan ke folder Google Drive yang sesuai.

Setelah mengganti kode `Code.gs` pada Apps Script, jalankan deployment versi baru melalui **Deploy > Manage deployments**. Google akan meminta izin tambahan untuk mengelola Google Drive; setujui izin tersebut hanya bila folder tujuan dan akun pemiliknya memang milik Anda. Pengaturan deployment tetap **Execute as: Me** agar siswa tidak diminta izin Drive.

Jika file belum masuk ke Drive, pilih fungsi **cekAksesFolderLKM** di editor Apps Script lalu klik **Run**. Fungsi ini tidak mengubah file apa pun; fungsinya hanya memeriksa akses ke kelima folder dan memunculkan permintaan izin Google Drive bila masih diperlukan. Setelah berhasil, **Execution log** akan menampilkan nama kelima folder.

Jika tab **Log Pengumpulan LKM** menampilkan error izin `DriveApp.Folder.createFile`, pilih fungsi **aktifkanIzinUploadLKM** lalu klik **Run**. Saat Google meminta izin, pilih akun yang melakukan deployment dan setujui akses Google Drive. Fungsi ini membuat file uji di folder Materi 1 lalu langsung memindahkannya ke Sampah; tidak ada file uji yang tersisa di folder pengumpulan.

Setiap percobaan unggah LKM juga akan dicatat di tab spreadsheet **Log Pengumpulan LKM**. Kolom **Status** menunjukkan `Berhasil` atau alasan kegagalan, sedangkan kolom **Tautan File** menyediakan tautan langsung ke file Google Drive yang berhasil diunggah.
