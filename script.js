/*
 * Tempel URL Web app Google Apps Script (yang berakhir dengan /exec)
 * setelah menjalankan langkah deployment pada file Code.gs.
 */
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrtXzwqHHnimfRMcs3fPf_uBtogiKkLHMdiyaly0ITdbE-miX6ZlMsniKQG_dvliVM/exec';
const CLASS_OPTIONS = ['10 - TKI', '10 - TFLM', '10 - GP', '10 - TITL', '10 - TBKR'];
const MAX_LKM_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_LKM_EXTENSIONS = ['pdf', 'doc', 'docx'];
const DCI_STORAGE_KEY = 'ruangbelajar_dci_draft';
const DCI_MATERIALS = {
  1: {
    title: 'IPO, Hardware, Software, dan Sistem Operasi',
    welcomeTitle: 'Investigasi Komputer Laboratorium',
    welcome: 'Anda adalah tim analis teknologi yang diminta mencari penyebab komputer laboratorium mengalami penurunan kinerja.',
    focus: 'Analisis sistem komputer dan penggunaan sumber daya',
    caseTitle: 'Studi Kasus: Komputer Laboratorium Lambat',
    instruction: 'Pelajari skenario dengan teliti. Cari akar masalah berdasarkan bukti numerik dan sumber teknis.',
    scenario: [
      'Komputer laboratorium digunakan untuk membuka browser dengan beberapa tab, Microsoft Word, PowerPoint, Paint, dan File Explorer.',
      'Setelah beberapa saat, aplikasi membutuhkan waktu lebih lama untuk merespons dan perpindahan antar aplikasi terasa lambat.',
      'Guru meminta siswa menganalisis kondisi tersebut sebelum mengambil keputusan atau memasang software tertentu.',
    ],
    symptoms: ['Aplikasi merespons lebih lambat dari biasanya.', 'Perpindahan antar aplikasi terasa ada jeda atau lag.', 'Komputer masih berjalan, tetapi tidak responsif seperti awal dinyalakan.'],
    facts: ['Processor: Intel Core i3', 'RAM: 4 GB DDR4', 'Storage: SSD 256 GB', 'Sistem Operasi: Windows 11 64-bit'],
    dataTitle: 'Simulasi Task Manager (Penggunaan Sumber Daya)',
    metrics: [
      ['CPU Utilization', '35%', 'Intel Core i3'],
      ['Memory (RAM) Usage', '89%', '3.56 GB dari 4.00 GB digunakan'],
      ['Disk (SSD) Usage', '15%', 'SSD 256 GB'],
    ],
    evidence: [
      ['Data Telemetri Task Manager', 'CPU 35%, RAM 89%, dan disk SSD 15%. Penggunaan memori mendekati kapasitas maksimum saat banyak aplikasi dibuka.'],
      ['Spesifikasi Hardware Laboratorium', 'Processor Intel i3, RAM 4 GB DDR4, SSD 256 GB, dan Windows 11. Kapasitas RAM terbatas untuk banyak aplikasi sekaligus.'],
      ['Dokumentasi Resmi Microsoft Support', 'Saat RAM hampir penuh, Windows menggunakan virtual memory pada storage sehingga respons sistem dapat melambat.'],
      ['Artikel Blog Teknologi Umum', 'Blog “Trik Komputer Cepat” mengklaim komputer lambat pasti disebabkan virus dan menyarankan aplikasi RAM Booster.'],
      ['Forum Diskusi Komunitas Komputer', 'Pengguna menyarankan memeriksa tab Performance, menutup tab browser berlebih, atau menambah memori fisik.'],
      ['Video Tutorial YouTube', 'Video menyarankan mematikan Windows Defender dan mengubah registry secara manual untuk mempercepat komputer.'],
    ],
    eval3: 'Evaluasi Evidence 3 (Dokumentasi Resmi Microsoft)',
    eval4: 'Evaluasi Evidence 4 (Blog Trik Komputer Cepat)',
    sourceA: ['Sumber A (Blog Pribadi)', '“Install RAM Booster agar komputer menjadi lebih cepat secara instan!”'],
    sourceB: ['Sumber B (Dokumentasi Resmi Microsoft)', '“Kurangi beban aplikasi atau tambah kapasitas memori fisik jika penggunaan RAM tinggi.”'],
    challenge: 'Jika mengambil keputusan terkait komputer laboratorium, sumber mana yang lebih layak dijadikan dasar?',
    analysis: [
      '1. Data Task Manager dan gejala apa yang menunjukkan adanya masalah pada komputer?',
      '2. Bukti mana yang paling relevan untuk dianalisis dan mengapa?',
      '3. Bagaimana RAM 4 GB dan processor Intel i3 berhubungan dengan komputer yang terasa lambat?',
      '4. Bagaimana browser, Word, PowerPoint, dan aplikasi lain berkontribusi terhadap beban komputer?',
      '5. Apa peran Windows 11 dalam mengelola memori saat beban kerja tinggi?',
      '6. Apakah semua informasi di internet dapat langsung digunakan sebagai dasar keputusan? Jelaskan.',
      '7. Berdasarkan seluruh bukti, apa kemungkinan utama penyebab komputer melambat?',
    ],
    decisions: [
      '1. Apa penyebab yang paling mungkin dari penurunan kinerja komputer laboratorium?',
      '2. Bukti apa yang mendukung kesimpulan Anda? Sebutkan nomor Evidence.',
      '3. Apa rekomendasi konkret untuk mengatasi masalah komputer laboratorium?',
      '4. Mengapa rekomendasi Anda lebih dapat dipertanggungjawabkan daripada memasang RAM Booster?',
      '5. Informasi tambahan apa yang Anda perlukan sebelum mengambil keputusan final?',
    ],
    reflection: [
      '1. Sebelum pembelajaran ini, apakah Anda biasanya langsung mencoba solusi komputer dari internet?',
      '2. Setelah investigasi, apa yang berubah dari cara Anda mengevaluasi informasi digital?',
      '3. Bukti atau informasi mana yang paling memengaruhi keputusan akhir Anda?',
      '4. Apa yang akan Anda lakukan berbeda saat menemukan informasi teknologi di internet?',
      '5. Bagian investigasi mana yang paling sulit dan bagaimana Anda mengatasinya?',
      '6. Refleksi Tanggung Jawab Sosial (CASEL)',
    ],
    reflectionDescription: 'Bagaimana Anda memastikan rekomendasi tidak merugikan pengguna komputer lain di sekolah?',
  },
  2: {
    title: 'Konsep Dasar AI',
    welcomeTitle: 'Investigasi Jawaban Kecerdasan Buatan',
    welcome: 'Anda menjadi tim pemeriksa fakta yang menyelidiki jawaban AI yang digunakan siswa untuk tugas sekolah.',
    focus: 'Cara kerja AI, verifikasi keluaran, dan etika penggunaan AI',
    caseTitle: 'Studi Kasus: Jawaban AI yang Tidak Akurat',
    instruction: 'Periksa bagaimana prompt dan data memengaruhi jawaban AI. Bandingkan keluaran dengan sumber tepercaya sebelum menyimpulkan.',
    scenario: [
      'Seorang siswa meminta chatbot menjelaskan dampak sampah plastik di laut dan menyertakan angka statistik untuk tugas kelas.',
      'Jawaban AI tersusun rapi, tetapi mencantumkan angka tanpa tautan sumber dan satu klaim yang berbeda dari situs lembaga lingkungan.',
      'Guru meminta tim memeriksa proses AI, ketepatan jawaban, dan cara menggunakan AI secara bertanggung jawab.',
    ],
    symptoms: ['Jawaban terlihat meyakinkan tetapi tidak memiliki rujukan.', 'Angka statistik berbeda dengan informasi pada sumber resmi.', 'Siswa belum memeriksa jawaban sebelum mengumpulkannya.'],
    facts: ['Prompt: “Jelaskan dampak sampah plastik di laut.”', 'Jawaban AI memuat 3 klaim statistik.', 'Hanya 1 dari 3 klaim cocok dengan sumber yang diperiksa.', 'Tautan sumber tidak disertakan oleh chatbot.'],
    dataTitle: 'Data Pemeriksaan Jawaban AI',
    metrics: [
      ['Klaim yang diperiksa', '3 klaim', 'Dalam jawaban chatbot'],
      ['Klaim terverifikasi', '1 klaim', 'Cocok dengan sumber resmi'],
      ['Sumber tercantum', '0 tautan', 'Jawaban tidak menyebut rujukan'],
    ],
    evidence: [
      ['Prompt yang Digunakan', 'Prompt meminta penjelasan dampak sampah plastik, tetapi tidak meminta sumber atau batas waktu data.'],
      ['Keluaran Chatbot', 'Jawaban memuat tiga angka statistik dan penjelasan sebab-akibat, tanpa daftar referensi.'],
      ['Situs Lembaga Lingkungan', 'Laman lembaga lingkungan resmi memberikan data dan metodologi yang dapat diperiksa untuk dibandingkan.'],
      ['Unggahan Media Sosial', 'Unggahan populer mengutip angka berbeda tanpa menyebut asal data atau tanggal publikasi.'],
      ['Panduan Penggunaan AI Sekolah', 'Panduan meminta siswa memeriksa fakta, menyebut penggunaan AI, dan menulis dengan pemahaman sendiri.'],
      ['Catatan Pemeriksaan Siswa', 'Pemeriksaan awal menemukan satu klaim yang cocok dan dua klaim yang belum terverifikasi.'],
    ],
    eval3: 'Evaluasi Evidence 3 (Situs Lembaga Lingkungan)',
    eval4: 'Evaluasi Evidence 4 (Unggahan Media Sosial)',
    sourceA: ['Sumber A (Unggahan Media Sosial)', '“Angka ini pasti benar karena sudah banyak dibagikan.”'],
    sourceB: ['Sumber B (Lembaga Lingkungan)', '“Data dilengkapi tanggal, metode pengumpulan, dan penjelasan batas penggunaannya.”'],
    challenge: 'Sumber mana yang lebih layak digunakan untuk memeriksa klaim statistik pada jawaban AI?',
    analysis: [
      '1. Bagian mana dari jawaban AI yang perlu diperiksa dan apa masalah yang ditemukan?',
      '2. Bukti mana yang paling relevan untuk menguji klaim chatbot? Jelaskan.',
      '3. Bagaimana cara kerja AI generatif dapat menghasilkan jawaban yang terdengar benar tetapi keliru?',
      '4. Bagaimana prompt yang kurang spesifik memengaruhi keluaran chatbot pada kasus ini?',
      '5. Apa peran data pelatihan dan keterbatasan model terhadap ketepatan jawabannya?',
      '6. Mengapa angka pada jawaban AI harus dibandingkan dengan sumber tepercaya?',
      '7. Berdasarkan bukti, apakah jawaban AI layak langsung dikumpulkan sebagai tugas?',
    ],
    decisions: [
      '1. Apa kesimpulan Anda tentang ketepatan jawaban chatbot pada kasus ini?',
      '2. Bukti apa yang mendukung kesimpulan? Sebutkan nomor Evidence.',
      '3. Bagaimana sebaiknya siswa memperbaiki dan menggunakan jawaban AI tersebut?',
      '4. Mengapa memeriksa fakta dan menyatakan penggunaan AI merupakan tindakan bertanggung jawab?',
      '5. Informasi tambahan apa yang diperlukan untuk memverifikasi klaim yang belum jelas?',
    ],
    reflection: [
      '1. Sebelum pembelajaran ini, apakah Anda biasanya langsung mempercayai jawaban dari AI?',
      '2. Setelah investigasi, apa yang berubah dari cara Anda mengevaluasi keluaran AI?',
      '3. Bukti atau sumber mana yang paling memengaruhi keputusan akhir Anda?',
      '4. Apa yang akan Anda lakukan berbeda saat menggunakan AI untuk tugas berikutnya?',
      '5. Bagian investigasi mana yang paling sulit dan bagaimana Anda mengatasinya?',
      '6. Refleksi Tanggung Jawab Sosial (CASEL)',
    ],
    reflectionDescription: 'Bagaimana Anda menggunakan AI secara jujur tanpa menyebarkan informasi keliru atau mengabaikan karya orang lain?',
  },
  3: {
    title: 'Mesin Pencari & Mengevaluasi Sumber Informasi',
    welcomeTitle: 'Investigasi Hasil Pencarian Digital',
    welcome: 'Anda menjadi tim pemeriksa informasi yang menilai hasil pencarian tentang beasiswa untuk siswa.',
    focus: 'Strategi pencarian dan evaluasi kredibilitas sumber',
    caseTitle: 'Studi Kasus: Informasi Beasiswa yang Meragukan',
    instruction: 'Bandingkan hasil pencarian dan telusuri sumber aslinya. Jangan menyimpulkan hanya dari peringkat hasil atau judul.',
    scenario: [
      'Siswa mencari informasi beasiswa pendidikan dan menemukan situs yang meminta biaya administrasi sebelum pendaftaran.',
      'Situs tersebut muncul di halaman pertama mesin pencari, tetapi nama domainnya menyerupai lembaga resmi dan tidak mencantumkan kontak jelas.',
      'Guru meminta tim mengecek kredibilitas informasi dan menemukan pengumuman asli sebelum siswa mengirim data pribadi.',
    ],
    symptoms: ['Situs meminta pembayaran sebelum proses seleksi.', 'Nama domain mirip dengan lembaga resmi tetapi berbeda.', 'Informasi penerbit, tanggal, dan kontak sulit ditemukan.'],
    facts: ['Kueri pencarian: “beasiswa pendidikan siswa”.', 'Situs meragukan meminta biaya Rp150.000.', 'Domain situs berbeda dari domain lembaga resmi.', 'Pengumuman resmi tersedia pada kanal lembaga terkait.'],
    dataTitle: 'Data Hasil Penelusuran',
    metrics: [
      ['Hasil halaman pertama', '10 hasil', 'Termasuk iklan dan hasil organik'],
      ['Biaya yang diminta', 'Rp150.000', 'Dibayar sebelum seleksi'],
      ['Domain terverifikasi', '1 sumber', 'Ditemukan pada kanal resmi'],
    ],
    evidence: [
      ['Kueri dan Halaman Hasil Pencarian', 'Kueri “beasiswa pendidikan siswa” menampilkan iklan, situs berita, dan laman pendaftaran yang belum dikenal.'],
      ['Situs Pendaftaran Beasiswa', 'Situs meminta biaya Rp150.000 dan data identitas, tetapi tidak menyertakan alamat kantor atau penanggung jawab.'],
      ['Pengumuman di Situs Resmi', 'Kanal resmi lembaga memuat syarat, jadwal, dan tautan pendaftaran tanpa biaya administrasi.'],
      ['Pesan Berantai', 'Pesan menyatakan pendaftaran harus segera dilakukan dan meminta pembayaran ke rekening pribadi.'],
      ['Artikel Media Kredibel', 'Media dengan redaksi dan tanggal publikasi jelas menjelaskan ciri penipuan beasiswa serupa.'],
      ['Data Domain dan Kontak', 'Nama domain berbeda dari kanal resmi dan informasi pemilik serta kontak tidak dapat diverifikasi.'],
    ],
    eval3: 'Evaluasi Evidence 3 (Pengumuman Situs Resmi)',
    eval4: 'Evaluasi Evidence 4 (Pesan Berantai)',
    sourceA: ['Sumber A (Pesan Berantai)', '“Segera bayar ke rekening ini agar kuota beasiswa tidak hangus.”'],
    sourceB: ['Sumber B (Kanal Resmi Lembaga)', '“Informasi persyaratan dan pendaftaran tersedia pada domain resmi lembaga.”'],
    challenge: 'Sumber mana yang paling layak dijadikan dasar sebelum siswa mengirim uang atau data pribadi?',
    analysis: [
      '1. Tanda apa pada hasil pencarian dan situs pendaftaran yang patut dicurigai?',
      '2. Bukti apa yang paling relevan untuk memastikan informasi beasiswa itu asli?',
      '3. Bagaimana peringkat mesin pencari berbeda dari jaminan kebenaran sebuah situs?',
      '4. Bagaimana kata kunci pencarian dapat diperbaiki agar menemukan pengumuman resmi?',
      '5. Informasi penerbit, domain, tanggal, dan kontak apa yang perlu diperiksa?',
      '6. Mengapa pesan berantai dan hasil populer tidak otomatis menjadi sumber tepercaya?',
      '7. Berdasarkan bukti, apakah siswa sebaiknya mendaftar melalui situs tersebut?',
    ],
    decisions: [
      '1. Apa kesimpulan Anda tentang situs pendaftaran beasiswa tersebut?',
      '2. Bukti apa yang mendukung kesimpulan? Sebutkan nomor Evidence.',
      '3. Langkah aman apa yang sebaiknya dilakukan siswa untuk mencari dan mendaftar beasiswa?',
      '4. Mengapa memeriksa domain dan menghindari pembayaran awal penting dilakukan?',
      '5. Informasi tambahan apa yang perlu dikonfirmasi langsung kepada lembaga?',
    ],
    reflection: [
      '1. Sebelum pembelajaran ini, apakah Anda biasanya memilih hasil pencarian teratas tanpa memeriksa situsnya?',
      '2. Setelah investigasi, apa yang berubah dari cara Anda menilai hasil pencarian?',
      '3. Bukti atau sumber mana yang paling memengaruhi keputusan akhir Anda?',
      '4. Apa yang akan Anda lakukan berbeda saat mencari informasi penting di internet?',
      '5. Bagian investigasi mana yang paling sulit dan bagaimana Anda mengatasinya?',
      '6. Refleksi Tanggung Jawab Sosial (CASEL)',
    ],
    reflectionDescription: 'Bagaimana Anda melindungi data pribadi dan membantu orang lain agar tidak tertipu informasi beasiswa palsu?',
  },
  4: {
    title: 'Aplikasi Produktivitas Berbasis AI & Infografis Digital',
    welcomeTitle: 'Investigasi Infografis Berbantuan AI',
    welcome: 'Anda menjadi tim editor yang memeriksa infografis kampanye hemat energi yang dibuat dengan bantuan AI.',
    focus: 'Pemanfaatan AI, akurasi informasi, dan desain infografis',
    caseTitle: 'Studi Kasus: Infografis Hemat Energi',
    instruction: 'Audit isi, visual, dan sumber pada infografis. Pastikan klaim akurat, mudah dipahami, dan penggunaan AI tetap transparan.',
    scenario: [
      'Sebuah kelompok membuat infografis hemat energi menggunakan AI untuk mencari ide, merangkum data, dan menghasilkan ilustrasi.',
      'Infografis terlihat menarik, tetapi salah satu angka penghematan tidak memiliki sumber dan ilustrasi AI menampilkan label alat yang keliru.',
      'Sebelum dipublikasikan di mading sekolah, guru meminta tim memeriksa fakta, keterbacaan, hak penggunaan, dan kontribusi AI.',
    ],
    symptoms: ['Angka penghematan energi tidak disertai sumber.', 'Ada label pada ilustrasi yang tidak sesuai fakta.', 'Infografis tidak menjelaskan bagian yang dibuat dengan AI.'],
    facts: ['Infografis memuat 8 klaim informasi.', '3 klaim belum memiliki sumber.', '1 ilustrasi AI memuat label yang keliru.', 'Belum ada keterangan penggunaan AI pada karya.'],
    dataTitle: 'Data Audit Infografis',
    metrics: [
      ['Klaim diperiksa', '8 klaim', 'Tercantum pada infografis'],
      ['Tanpa sumber', '3 klaim', 'Belum dapat diverifikasi'],
      ['Elemen perlu revisi', '2 elemen', 'Satu klaim dan satu visual'],
    ],
    evidence: [
      ['Draf Infografis', 'Draf memiliki delapan klaim, grafik sederhana, dan ajakan hemat energi untuk warga sekolah.'],
      ['Riwayat Prompt AI', 'Prompt meminta ide dan ilustrasi, tetapi tidak meminta sumber, satuan data, atau pengecekan fakta.'],
      ['Situs Resmi Energi', 'Sumber resmi menjelaskan data konsumsi energi, satuan, dan konteks penggunaan peralatan.'],
      ['Ilustrasi Hasil AI', 'Ilustrasi menampilkan label perangkat yang keliru dan tidak mencantumkan sumber aset visual.'],
      ['Umpan Balik Teman', 'Teman menemukan tiga klaim tanpa rujukan dan teks kecil yang sulit dibaca.'],
      ['Panduan Hak Cipta dan AI', 'Panduan sekolah meminta pencantuman sumber, pemeriksaan hasil AI, dan atribusi karya yang digunakan.'],
    ],
    eval3: 'Evaluasi Evidence 3 (Situs Resmi Energi)',
    eval4: 'Evaluasi Evidence 4 (Ilustrasi Hasil AI)',
    sourceA: ['Sumber A (Teks Keluaran AI)', '“Angka terlihat masuk akal, jadi tidak perlu dicantumkan sumbernya.”'],
    sourceB: ['Sumber B (Situs Resmi Energi)', '“Data harus disertai satuan, konteks, dan rujukan yang dapat diverifikasi.”'],
    challenge: 'Sumber mana yang lebih layak untuk memeriksa klaim dan angka pada infografis?',
    analysis: [
      '1. Masalah fakta dan desain apa yang ditemukan pada draf infografis?',
      '2. Bukti mana yang paling relevan untuk memeriksa klaim hemat energi?',
      '3. Bagaimana AI membantu proses pembuatan infografis dan apa batasannya?',
      '4. Bagaimana prompt yang lebih terarah dapat menghasilkan draf yang lebih berguna?',
      '5. Mengapa hasil ilustrasi AI dan angka statistik tetap harus diperiksa manusia?',
      '6. Bagaimana sumber dan atribusi seharusnya ditampilkan pada infografis?',
      '7. Apakah infografis sudah layak dipublikasikan? Jelaskan kesimpulan Anda.',
    ],
    decisions: [
      '1. Apa kesimpulan Anda tentang kelayakan infografis untuk dipublikasikan?',
      '2. Bukti apa yang mendukung kesimpulan? Sebutkan nomor Evidence.',
      '3. Revisi apa yang perlu dilakukan sebelum infografis dibagikan?',
      '4. Mengapa mencantumkan sumber dan penggunaan AI membuat karya lebih bertanggung jawab?',
      '5. Informasi atau izin tambahan apa yang perlu diperoleh sebelum publikasi?',
    ],
    reflection: [
      '1. Sebelum pembelajaran ini, apakah Anda biasanya langsung menggunakan hasil AI untuk karya visual?',
      '2. Setelah investigasi, apa yang berubah dari cara Anda menggunakan AI untuk berkarya?',
      '3. Bukti atau masukan mana yang paling memengaruhi keputusan akhir Anda?',
      '4. Apa yang akan Anda lakukan berbeda saat menyusun infografis berikutnya?',
      '5. Bagian investigasi mana yang paling sulit dan bagaimana Anda mengatasinya?',
      '6. Refleksi Tanggung Jawab Sosial (CASEL)',
    ],
    reflectionDescription: 'Bagaimana Anda memastikan infografis yang dibagikan akurat, inklusif, serta menghargai sumber dan karya orang lain?',
  },
  5: {
    title: 'Portofolio dan Review Penguatan Materi',
    welcomeTitle: 'Investigasi Kualitas Portofolio Belajar',
    welcome: 'Anda menjadi tim kurator yang menilai portofolio digital sebelum digunakan sebagai bukti capaian belajar.',
    focus: 'Seleksi karya, bukti capaian, dan refleksi pembelajaran',
    caseTitle: 'Studi Kasus: Portofolio yang Belum Siap Dinilai',
    instruction: 'Nilai keterkaitan karya dengan tujuan belajar, kelengkapan bukti, proses revisi, dan refleksi pemilik portofolio.',
    scenario: [
      'Seorang siswa mengumpulkan portofolio digital berisi lima karya dari beberapa materi yang telah dipelajari.',
      'Dua karya tidak disertai penjelasan tujuan, satu karya menggunakan gambar tanpa sumber, dan refleksi hanya menyebutkan “sudah selesai”.',
      'Guru meminta tim menentukan apakah portofolio cukup menunjukkan proses dan capaian belajar serta memberi saran perbaikan.',
    ],
    symptoms: ['Keterkaitan beberapa karya dengan tujuan belajar belum jelas.', 'Ada gambar tanpa atribusi sumber.', 'Refleksi tidak menjelaskan proses, tantangan, atau perbaikan.'],
    facts: ['Jumlah karya dalam portofolio: 5.', '2 karya belum memiliki keterangan tujuan belajar.', '1 gambar tidak mencantumkan sumber.', 'Refleksi akhir hanya berisi satu kalimat.'],
    dataTitle: 'Data Audit Portofolio',
    metrics: [
      ['Jumlah karya', '5 karya', 'Dari beberapa materi'],
      ['Karya tanpa tujuan', '2 karya', 'Capaian belajar belum terlihat'],
      ['Bukti perlu dilengkapi', '3 item', 'Atribusi dan refleksi termasuk'],
    ],
    evidence: [
      ['Daftar Karya Portofolio', 'Lima karya dikumpulkan, tetapi hanya tiga yang mencantumkan materi dan tujuan pembelajaran.'],
      ['Rubrik Penilaian', 'Rubrik menilai relevansi karya, proses, kualitas hasil, sumber, dan refleksi belajar.'],
      ['Catatan Proses dan Revisi', 'Catatan menunjukkan satu karya direvisi setelah menerima umpan balik, sementara karya lain belum memiliki bukti proses.'],
      ['Gambar Tanpa Atribusi', 'Salah satu karya memakai gambar dari internet tanpa tautan, nama pembuat, atau lisensi.'],
      ['Refleksi Siswa', 'Refleksi hanya menuliskan “semua tugas sudah selesai” tanpa menjelaskan hal yang dipelajari atau tantangan.'],
      ['Umpan Balik Guru', 'Guru meminta setiap karya dihubungkan dengan capaian belajar dan refleksi menyertakan bukti proses.'],
    ],
    eval3: 'Evaluasi Evidence 3 (Catatan Proses dan Revisi)',
    eval4: 'Evaluasi Evidence 4 (Gambar Tanpa Atribusi)',
    sourceA: ['Sumber A (Pendapat Teman)', '“Portofolio sudah lengkap karena semua berkas sudah dikumpulkan.”'],
    sourceB: ['Sumber B (Rubrik Penilaian)', '“Karya dinilai dari relevansi, proses, sumber, kualitas hasil, dan refleksi belajar.”'],
    challenge: 'Acuan mana yang lebih tepat untuk menilai apakah portofolio sudah menunjukkan capaian belajar?',
    analysis: [
      '1. Bagian apa pada portofolio yang belum cukup menunjukkan capaian belajar?',
      '2. Bukti mana yang paling relevan untuk menilai kualitas dan kelengkapan portofolio?',
      '3. Bagaimana setiap karya seharusnya dihubungkan dengan tujuan pembelajaran?',
      '4. Bagaimana proses revisi dan umpan balik menunjukkan perkembangan kemampuan?',
      '5. Apa pentingnya mencantumkan sumber dan lisensi pada karya portofolio?',
      '6. Mengapa jumlah berkas saja tidak cukup untuk membuktikan keberhasilan belajar?',
      '7. Berdasarkan bukti, apakah portofolio sudah siap dinilai? Jelaskan.',
    ],
    decisions: [
      '1. Apa kesimpulan Anda tentang kesiapan portofolio untuk dinilai?',
      '2. Bukti apa yang mendukung kesimpulan? Sebutkan nomor Evidence.',
      '3. Perbaikan apa yang perlu dilakukan pemilik portofolio?',
      '4. Mengapa refleksi dan atribusi sumber penting dalam portofolio digital?',
      '5. Bukti proses atau informasi tambahan apa yang masih perlu dilengkapi?',
    ],
    reflection: [
      '1. Sebelum pembelajaran ini, apakah Anda menganggap portofolio cukup berisi kumpulan tugas saja?',
      '2. Setelah investigasi, apa yang berubah dari cara Anda memilih bukti belajar?',
      '3. Bukti atau kriteria mana yang paling memengaruhi keputusan akhir Anda?',
      '4. Apa yang akan Anda lakukan berbeda saat menyusun portofolio berikutnya?',
      '5. Bagian investigasi mana yang paling sulit dan bagaimana Anda mengatasinya?',
      '6. Refleksi Tanggung Jawab Sosial (CASEL)',
    ],
    reflectionDescription: 'Bagaimana Anda memastikan portofolio jujur, menghargai karya orang lain, dan menggambarkan proses belajar dengan adil?',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Populate Class Selects untuk Form Refleksi Lama
  document.querySelectorAll('input[id^="class-"]').forEach((input) => {
    const select = document.createElement('select');
    select.className = 'form-select';
    select.id = input.id;
    select.required = true;
    select.innerHTML = '<option value="" selected disabled>Pilih kelas</option>';
    CLASS_OPTIONS.forEach((className) => {
      const option = document.createElement('option');
      option.value = className;
      option.textContent = className;
      select.appendChild(option);
    });
    input.replaceWith(select);
  });

  const showToast = (title, message, success = true) => {
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center border-0';
    toast.id = toastId;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="d-flex ${success ? 'text-bg-success' : 'text-bg-danger'}">
        <div class="toast-body"><strong>${title}</strong><br><small>${message}</small></div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button>
      </div>`;
    document.getElementById('toastContainer').appendChild(toast);
    const instance = new bootstrap.Toast(toast, { delay: 4500 });
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
    instance.show();
  };

  const materialTitleFor = (form) => form
    .closest('.accordion-item')
    .querySelector('.accordion-button span:nth-child(2)')
    .textContent.trim().replace(/\s+/g, ' ');

  const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('File tidak dapat dibaca.'));
    reader.readAsDataURL(file);
  });

  // Setup Form Pengumpulan File LKM Lama
  document.querySelectorAll('.task-form').forEach((form, index) => {
    const number = index + 1;
    const identityFields = `
      <div class="row g-2 mb-3">
        <div class="col-6"><label class="form-label" for="lkm-name-${number}">Nama</label><input class="form-control lkm-name" id="lkm-name-${number}" type="text" placeholder="Nama lengkap" required /></div>
        <div class="col-6"><label class="form-label" for="lkm-class-${number}">Kelas</label><select class="form-select lkm-class" id="lkm-class-${number}" required><option value="" selected disabled>Pilih kelas</option></select></div>
      </div>`;
    const description = form.querySelector('p');
    const heading = form.querySelector('h4');
    if (description) description.insertAdjacentHTML('afterend', identityFields);
    else if (heading) heading.insertAdjacentHTML('afterend', identityFields);
    else form.insertAdjacentHTML('afterbegin', identityFields);
    const classSelect = form.querySelector('.lkm-class');
    CLASS_OPTIONS.forEach((className) => {
      const option = document.createElement('option');
      option.value = className;
      option.textContent = className;
      classSelect.appendChild(option);
    });
  });

  document.querySelectorAll('.file-picker input[type="file"]').forEach((input) => {
    input.addEventListener('change', () => {
      const label = input.closest('.file-picker');
      const fileName = input.files.length ? input.files[0].name : 'Belum ada file dipilih';
      label.querySelector('small').textContent = fileName;
    });
  });

  document.querySelectorAll('.task-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (GOOGLE_APPS_SCRIPT_URL.includes('PASTE_')) {
        showToast('Koneksi belum selesai', 'Masukkan URL Web App Google Apps Script pada script.js.', false);
        return;
      }

      const fileInput = form.querySelector('.file-picker input[type="file"]');
      const file = fileInput.files[0];
      const extension = file ? file.name.split('.').pop().toLowerCase() : '';
      if (!file || !ALLOWED_LKM_EXTENSIONS.includes(extension)) {
        showToast('Format file tidak sesuai', 'Unggah file PDF, DOC, atau DOCX.', false);
        return;
      }
      if (file.size > MAX_LKM_FILE_SIZE) {
        showToast('File terlalu besar', 'Ukuran file LKM maksimal 10 MB.', false);
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      try {
        submitButton.disabled = true;
        submitButton.textContent = 'Mengunggah...';
        const data = {
          type: 'lkm',
          materi: materialTitleFor(form),
          nama: form.querySelector('.lkm-name').value,
          kelas: form.querySelector('.lkm-class').value,
          file: { name: file.name, base64: await readFileAsBase64(file) },
        };
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data),
        });
        showToast('Permintaan unggah dikirim', 'File berhasil diunggah ke Google Drive guru.');
        form.reset();
        form.querySelector('.file-picker small').textContent = 'Belum ada file dipilih';
      } catch (error) {
        showToast('Pengiriman gagal', 'Periksa koneksi internet lalu coba lagi.', false);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Kumpulkan File LKM';
      }
    });
  });

  document.querySelectorAll('.reflection-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const submitButton = form.querySelector('button[type="submit"]');
      const material = form.closest('.accordion-item').querySelector('.accordion-button span:nth-child(2)').textContent.trim().replace(/\s+/g, ' ');
      const data = {
        type: 'reflection',
        materi: material,
        nama: form.querySelector('input[id^="name-"]').value,
        kelas: form.querySelector('[id^="class-"]').value,
        refleksi: form.querySelector('textarea').value,
      };

      try {
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data),
        });
        showToast('Refleksi dikirim', 'Terima kasih. Refleksi telah dikirim ke spreadsheet.');
        form.reset();
      } catch (error) {
        showToast('Pengiriman gagal', 'Periksa koneksi internet.', false);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Kirim Refleksi';
      }
    });
  });

  document.querySelectorAll('.test-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.getAttribute('href') && link.getAttribute('href') !== '#') return;
      event.preventDefault();
      showToast(link.dataset.test, 'Tambahkan tautan Google Drive, Google Form, atau Quiz pada atribut href.', false);
    });
  });

  // ==================================================
  // LOGIKA MANAJEMEN DIGITAL CASE INVESTIGATION (DCI)
  // ==================================================
  let currentRoom = 1;
  let activeMaterialId = '';
  const materialSelect = document.getElementById('dci-material-select');
  const dciDrafts = {};

  const renderMaterial = (materialId) => {
    const material = DCI_MATERIALS[materialId];
    if (materialId === '6') {
      document.getElementById('dciMaterialName').textContent = 'Flowchart';
      document.getElementById('dciWelcomeTitle').textContent = 'Digital Case Investigation - Flowchart';
      document.getElementById('dciWelcomeDescription').textContent = 'Pilih kasus dan susun algoritma serta flowchart secara berkelompok.';
      document.getElementById('dciWelcomeMaterial').textContent = 'Flowchart';
      document.getElementById('dciWelcomeFocus').textContent = 'Algoritma, IPO, dan representasi flowchart';
      document.getElementById('btnStartDci').disabled = true;
      document.getElementById('dciCaseContent').classList.add('d-none');
      document.getElementById('dciCaseSelectPrompt').classList.remove('d-none');
      return;
    }
    document.getElementById('dciMaterialName').textContent = material ? material.title : 'Pilih Materi';
    document.getElementById('dciWelcomeTitle').textContent = material ? material.welcomeTitle : 'Investigasi Kasus Pembelajaran';
    document.getElementById('dciWelcomeDescription').textContent = material ? material.welcome : 'Pilih materi terlebih dahulu untuk melihat kasus LKM yang sesuai.';
    document.getElementById('dciWelcomeMaterial').textContent = material ? material.title : 'Pilih Materi';
    document.getElementById('dciWelcomeFocus').textContent = material ? material.focus : 'Pilih materi terlebih dahulu';
    document.getElementById('btnStartDci').disabled = !material;
    document.getElementById('dciCaseContent').classList.toggle('d-none', !material);
    document.getElementById('dciCaseSelectPrompt').classList.toggle('d-none', Boolean(material));
    if (!material) return;

    document.getElementById('dciCaseTitle').textContent = material.caseTitle;
    document.getElementById('dciCaseInstructionText').textContent = material.instruction;
    document.getElementById('dciSymptomsTitle').textContent = materialId === '1' ? 'Gejala yang Ditemukan' : 'Temuan Awal';
    document.getElementById('dciFactsTitle').textContent = materialId === '1' ? 'Informasi Awal Komputer (Data Kasus)' : 'Informasi Pendukung Kasus';
    ['dciCaseScenario1', 'dciCaseScenario2', 'dciCaseScenario3'].forEach((id, index) => {
      document.getElementById(id).textContent = material.scenario[index];
    });

    const renderList = (elementId, entries) => {
      const list = document.getElementById(elementId);
      list.replaceChildren(...entries.map((entry, index) => {
        const item = document.createElement('li');
        item.textContent = entry;
        if (index < entries.length - 1) item.className = 'mb-1';
        return item;
      }));
    };
    renderList('dciCaseSymptoms', material.symptoms);
    renderList('dciCaseFacts', material.facts);

    document.getElementById('dciDataTitle').textContent = material.dataTitle;
    document.querySelectorAll('#dciCaseContent .metric-label').forEach((node, index) => {
      node.textContent = material.metrics[index][0];
    });
    document.querySelectorAll('#dciCaseContent .metric-value').forEach((node, index) => {
      node.textContent = material.metrics[index][1];
    });
    document.querySelectorAll('#dciCaseContent .metric-detail').forEach((node, index) => {
      node.textContent = material.metrics[index][2];
    });

    document.querySelectorAll('#evidenceCardsContainer .evidence-card').forEach((card, index) => {
      card.querySelector('h6').textContent = material.evidence[index][0];
      card.querySelector('p').textContent = material.evidence[index][1];
    });
    document.getElementById('evalSourceTitle3').textContent = material.eval3;
    document.getElementById('evalSourceTitle4').textContent = material.eval4;
    document.getElementById('sourceATitle').textContent = `${material.sourceA[0]}:`;
    document.getElementById('sourceAClaim').textContent = material.sourceA[1];
    document.getElementById('sourceBTitle').textContent = `${material.sourceB[0]}:`;
    document.getElementById('sourceBClaim').textContent = material.sourceB[1];
    document.getElementById('sourceChallengeQuestion').textContent = material.challenge;
    document.getElementById('analysisInstruction').textContent = `Bedakan fakta, klaim, dugaan awal, dan kesimpulan logis. Hubungkan bukti dengan materi ${material.title}.`;
    material.analysis.forEach((question, index) => {
      document.getElementById(`an-label-${index + 1}`).textContent = question;
    });
    material.decisions.forEach((question, index) => {
      document.getElementById(`dec-label-${index + 1}`).textContent = question;
    });
    material.reflection.slice(0, 5).forEach((question, index) => {
      document.getElementById(`ref-label-${index + 1}`).textContent = question;
    });
    document.getElementById('refDescription').textContent = material.reflectionDescription;
    document.querySelectorAll('#analysisForm textarea').forEach((field) => {
      field.placeholder = 'Tuliskan analisis berdasarkan kasus dan bukti...';
    });
  };

  const restoreDciAnswers = (data) => {
    const answerFields = document.querySelectorAll('#dci .dci-container input, #dci .dci-container textarea, #dci .dci-container select');
    answerFields.forEach((field) => {
      if (field.id === 'dci-material-select') return;
      const savedAnswer = data?.answers?.[field.id];
      if (savedAnswer) {
        if (field.type === 'checkbox' || field.type === 'radio') field.checked = savedAnswer.checked;
        else field.value = savedAnswer.value;
      } else if (data) {
        field.value = '';
        if (field.type === 'checkbox' || field.type === 'radio') field.checked = false;
      }
    });

    if (!data?.answers) {
      if (data?.nama) document.getElementById('dci-student-name').value = data.nama;
      if (data?.kelas) document.getElementById('dci-student-class').value = data.kelas;
      if (data?.sourceChallengeChoice) {
        const radio = document.querySelector(`input[name="sourceChallenge"][value="${data.sourceChallengeChoice}"]`);
        if (radio) radio.checked = true;
      }
      const legacyAnswers = {
        scReason: data?.sourceChallengeReason,
        'an-q1': data?.analysisProblem,
        'an-q3': data?.analysisHardware,
        'an-q4': data?.analysisSoftware,
        'an-q5': data?.analysisOS,
        'dec-q1': data?.decisionCause,
        'dec-q3': data?.decisionRecommendation,
        'ref-q2': data?.reflectionChange,
        'ref-q6': data?.reflectionResponsibility,
      };
      Object.entries(legacyAnswers).forEach(([id, value]) => {
        if (value) document.getElementById(id).value = value;
      });
    }
  };

  materialSelect.addEventListener('change', () => {
    const studentName = document.getElementById('dci-student-name').value;
    const studentClass = document.getElementById('dci-student-class').value;
    if (activeMaterialId) saveDciDraft(activeMaterialId);
    activeMaterialId = materialSelect.value;
    renderMaterial(activeMaterialId);
    if (activeMaterialId) restoreDciAnswers(dciDrafts[activeMaterialId] || {});
    if (studentName) document.getElementById('dci-student-name').value = studentName;
    if (studentClass) document.getElementById('dci-student-class').value = studentClass;
    if (!activeMaterialId) navigateToRoom(1);
    else saveDciDraft(activeMaterialId);
  });

  renderMaterial('');

  const navigateToRoom = (roomNum) => {
    if (roomNum < 1 || roomNum > 8) return;

    if (roomNum > 1 && !materialSelect.value) {
      showToast('Materi Belum Dipilih', 'Pilih materi terlebih dahulu untuk membuka LKM.', false);
      navigateToRoom(1);
      return;
    }
    
    // Validasi identitas pada room 1 sebelum berlanjut
    if (roomNum > 1) {
      const name = document.getElementById('dci-student-name').value.trim();
      const studentClass = document.getElementById('dci-student-class').value;
      if (!name || !studentClass) {
        showToast('Identitas Belum Lengkap', 'Silakan isi nama dan kelas terlebih dahulu.', false);
        return;
      }
    }

    currentRoom = roomNum;
    document.querySelectorAll('.dci-room').forEach((room) => room.classList.add('d-none'));
    const targetRoom = document.getElementById(`room-${roomNum}`);
    if (targetRoom) targetRoom.classList.remove('d-none');

    // Update Stepper Visual
    document.querySelectorAll('.dci-stepper .step-item').forEach((stepBtn) => {
      const stepVal = parseInt(stepBtn.dataset.step, 10);
      stepBtn.classList.remove('active', 'completed');
      if (stepVal === roomNum) stepBtn.classList.add('active');
      else if (stepVal < roomNum) stepBtn.classList.add('completed');
    });

    // Update Progress Bar
    const progressPct = (roomNum / 8) * 100;
    document.getElementById('dciProgressBar').style.width = `${progressPct}%`;

    // Render Ringkasan pada Room 8
    if (roomNum === 8) renderSummary();

    saveDciDraft();
  };

  document.querySelectorAll('.btn-next-room').forEach((btn) => {
    btn.addEventListener('click', () => navigateToRoom(parseInt(btn.dataset.next, 10)));
  });

  document.querySelectorAll('.btn-prev-room').forEach((btn) => {
    btn.addEventListener('click', () => navigateToRoom(parseInt(btn.dataset.prev, 10)));
  });

  document.querySelectorAll('.dci-stepper .step-item').forEach((btn) => {
    btn.addEventListener('click', () => navigateToRoom(parseInt(btn.dataset.step, 10)));
  });

  // Interaktivitas Evidence Cards
  document.querySelectorAll('.ev-use-check, .ev-notes').forEach((elem) => {
    elem.addEventListener('change', () => {
      const card = elem.closest('.evidence-card');
      const isChecked = card.querySelector('.ev-use-check').checked;
      const notes = card.querySelector('.ev-notes').value.trim();
      const statusBadge = card.querySelector('.evidence-status');

      if (isChecked || notes) {
        statusBadge.textContent = 'Sudah dianalisis';
        statusBadge.className = 'badge bg-success evidence-status';
      } else {
        statusBadge.textContent = 'Belum ditinjau';
        statusBadge.className = 'badge bg-outline-secondary evidence-status';
      }
      saveDciDraft();
    });
  });

  const getDciPayload = (materialId = materialSelect.value) => {
    const evidenceUsed = [];
    document.querySelectorAll('.evidence-card').forEach((card) => {
      const evId = card.dataset.evidence;
      const isUsed = card.querySelector('.ev-use-check').checked;
      const notes = card.querySelector('.ev-notes').value.trim();
      if (isUsed || notes) {
        evidenceUsed.push(`Evidence ${evId} (Guna: ${isUsed ? 'Ya' : 'Tidak'}, Catatan: ${notes || '-'})`);
      }
    });

    const scChoice = document.querySelector('input[name="sourceChallenge"]:checked')?.value || '-';

    const answers = {};
    document.querySelectorAll('#dci .dci-container input, #dci .dci-container textarea, #dci .dci-container select').forEach((field) => {
      if (!field.id || field.id === 'dci-material-select') return;
      answers[field.id] = field.type === 'checkbox' || field.type === 'radio'
        ? { checked: field.checked }
        : { value: field.value };
    });

    return {
      type: 'dci',
      materialId,
      materi: DCI_MATERIALS[materialId]?.title || '',
      nama: document.getElementById('dci-student-name').value.trim(),
      kelas: document.getElementById('dci-student-class').value,
      answers,
      evidenceUsed: evidenceUsed,
      sourceEvaluation: [
        {
          source: `Evidence 3 (${DCI_MATERIALS[materialId]?.evidence[2][0] || '-'})`,
          credibility: document.getElementById('eval-cred-3').value,
          relevance: document.getElementById('eval-rel-3').value,
          reason: document.getElementById('eval-reason-3').value,
        },
        {
          source: `Evidence 4 (${DCI_MATERIALS[materialId]?.evidence[3][0] || '-'})`,
          credibility: document.getElementById('eval-cred-4').value,
          relevance: document.getElementById('eval-rel-4').value,
          reason: document.getElementById('eval-reason-4').value,
        }
      ],
      sourceChallengeChoice: scChoice,
      sourceChallengeReason: document.getElementById('scReason').value.trim(),
      analysisProblem: document.getElementById('an-q1').value.trim(),
      analysisHardware: document.getElementById('an-q3').value.trim(),
      analysisSoftware: document.getElementById('an-q4').value.trim(),
      analysisOS: document.getElementById('an-q5').value.trim(),
      decisionCause: document.getElementById('dec-q1').value.trim(),
      decisionRecommendation: document.getElementById('dec-q3').value.trim(),
      reflectionChange: document.getElementById('ref-q2').value.trim(),
      reflectionResponsibility: document.getElementById('ref-q6').value.trim(),
      timestamp: new Date().toISOString()
    };
  };

  const renderSummary = () => {
    const data = getDciPayload();
    document.getElementById('sumName').textContent = data.nama || '-';
    document.getElementById('sumClass').textContent = data.kelas || '-';
    document.getElementById('sumMaterial').textContent = data.materi || 'Pilih Materi';
    document.getElementById('sumEvidence').textContent = data.evidenceUsed.length ? data.evidenceUsed.join('; ') : 'Belum ada bukti dipilih';
    document.getElementById('sumChallenge').textContent = data.sourceChallengeChoice;
    document.getElementById('sumCause').textContent = data.decisionCause || '-';
    document.getElementById('sumRec').textContent = data.decisionRecommendation || '-';
  };

  const saveDciDraft = (materialId = materialSelect.value) => {
    if (!DCI_MATERIALS[materialId]) return;
    dciDrafts[materialId] = getDciPayload(materialId);
    localStorage.setItem(DCI_STORAGE_KEY, JSON.stringify({
      selectedMaterial: materialId,
      drafts: dciDrafts,
    }));
  };

  document.getElementById('dci').addEventListener('input', (event) => {
    if (activeMaterialId && event.target.matches('input, textarea, select') && event.target.id !== 'dci-material-select') {
      saveDciDraft(activeMaterialId);
    }
  });
  document.getElementById('dci').addEventListener('change', (event) => {
    if (activeMaterialId && event.target.matches('input, textarea, select') && event.target.id !== 'dci-material-select') {
      saveDciDraft(activeMaterialId);
    }
  });

  const loadDciDraft = () => {
    const raw = localStorage.getItem(DCI_STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.drafts && typeof data.drafts === 'object') {
        Object.assign(dciDrafts, data.drafts);
        activeMaterialId = DCI_MATERIALS[data.selectedMaterial] ? data.selectedMaterial : '';
      } else {
        activeMaterialId = DCI_MATERIALS[data.materialId] ? data.materialId : '1';
        dciDrafts[activeMaterialId] = data;
      }
      materialSelect.value = activeMaterialId;
      renderMaterial(activeMaterialId);
      restoreDciAnswers(dciDrafts[activeMaterialId]);
    } catch (e) { console.error('Gagal memuat draft DCI', e); }
  };

  loadDciDraft();

  document.getElementById('btnResetDci').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh isian investigasi?')) {
      localStorage.removeItem(DCI_STORAGE_KEY);
      location.reload();
    }
  });

  // SUBMIT INVESTIGASI DCI
  document.getElementById('btnSubmitDci').addEventListener('click', async () => {
    const data = getDciPayload();

    // Validasi Kelengkapan Minimal
    if (!data.nama || !data.kelas) {
      showToast('Identitas Kosong', 'Lengkapi Nama dan Kelas pada Room 1.', false);
      navigateToRoom(1);
      return;
    }

    if (!data.materialId || !DCI_MATERIALS[data.materialId]) {
      showToast('Materi Belum Dipilih', 'Pilih materi LKM sebelum mengirim hasil investigasi.', false);
      navigateToRoom(1);
      return;
    }

    if (!data.decisionCause || !data.decisionRecommendation) {
      showToast('Keputusan Belum Lengkap', 'Lengkapi Keputusan dan Rekomendasi pada Room 6.', false);
      navigateToRoom(6);
      return;
    }

    const uncheckAll = Array.from(document.querySelectorAll('.dci-check-req')).some((cb) => !cb.checked);
    if (uncheckAll) {
      showToast('Komitmen Belum Dicentang', 'Centang semua poin integritas pada Room 8.', false);
      return;
    }

    const btnSubmit = document.getElementById('btnSubmitDci');
    try {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Mengirim...';

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });

      document.getElementById('dciSuccessMsg').textContent = `Terima kasih, ${data.nama}. Hasil Digital Case Investigation Anda telah berhasil dikirim ke spreadsheet guru.`;
      document.getElementById('dciSuccessScreen').classList.remove('d-none');
      showToast('Berhasil Dikirim', 'Investigasi digital Anda telah berhasil dikirim.');
      localStorage.removeItem(DCI_STORAGE_KEY);
    } catch (err) {
      showToast('Pengiriman Gagal', 'Gagal mengirim data. Periksa jaringan Anda.', false);
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Kirim Hasil Investigasi';
    }
  });
});

/* ========================================= */
/* LOGIKA DCI FLOWCHART (MATERI 6)           */
/* ========================================= */

// DATA 9 KASUS FLOWCHART
const fcCases = [
  { id: 1, title: "Prosedur Masuk Area Praktik Terbatas", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Langkah 1: Siswa mengisi logbook kunjungan. Langkah 2: Menyerahkan kartu izin. Petugas mengecek kartu. Jika kartu tidak valid, siswa ditolak masuk dan kembali ke kelas. Jika kartu valid, petugas mengecek kelengkapan APD. Jika APD lengkap, siswa diizinkan masuk ke area praktik. Jika APD tidak lengkap, siswa diarahkan ke loker peminjaman APD terlebih dahulu.",
    tugas: "Identifikasi urutan proses (Sequence) dan titik keputusan (Decision), lalu gambarkan flowchart-nya secara berurutan." },
  { id: 2, title: "Peminjaman dan Pengecekan Alat Berat", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa mengisi formulir digital peminjaman alat. Sistem mengecek ketersediaan stok alat di gudang. Jika stok kosong, sistem mencetak tiket antrean tunggu. Jika stok tersedia, petugas mengambil alat dan mengecek kondisinya. Jika kondisi alat rusak, alat dikirim ke teknisi dan siswa diberi unit lain. Jika baik, alat diserahkan ke siswa beserta bukti pinjam.",
    tugas: "Tentukan input, proses, output, dan buat flowchart yang mengakomodasi dua kondisi percabangan tersebut." },
  { id: 3, title: "Inspeksi Standar Keselamatan (K3)", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Sebelum mesin dihidupkan, siswa memakai APD dasar. Pengawas melakukan inspeksi visual. Jika APD dasar tidak dipakai dengan benar, siswa langsung dikeluarkan dari ruang mesin. Jika dipakai dengan benar, siswa menekan tombol uji alarm mesin. Jika alarm berbunyi normal, mesin siap dioperasikan. Jika alarm mati, siswa harus mencabut daya mesin dan melapor ke teknisi.",
    tugas: "Buat flowchart yang menunjukkan urutan persiapan keselamatan dengan kondisi percabangan berjenjang (nested decision)." },
  { id: 4, title: "Pengujian Reaksi Sampel Mineral", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa menimbang sampel mineral dan mencatat berat awalnya. Siswa meneteskan cairan asam klorida pada sampel. Jika sampel tidak menghasilkan buih, sampel diklasifikasikan sebagai 'Non-Karbonat' dan disimpan. Jika menghasilkan buih, siswa mengukur durasi buih. Jika durasi buih lebih dari 5 detik, catat sebagai 'Kalsit Kuat'. Jika kurang dari 5 detik, catat sebagai 'Kalsit Lemah'.",
    tugas: "Analisis skenario ini. Tentukan keputusan ganda yang terjadi dan representasikan ke dalam bentuk flowchart." },
  { id: 5, title: "Mitigasi Cuaca pada Area Tambang Terbuka", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa mengecek monitor cuaca di pos pantau. Sistem membaca kecepatan angin dan curah hujan. Jika cuaca cerah, siswa diarahkan untuk mengambil alat gali dan mulai praktik. Jika turun hujan, sensor mengecek indikasi petir. Jika ada petir, bunyikan sirine bahaya dan evakuasi siswa ke shelter. Jika hujan tanpa petir, siswa memakai jas hujan dan melanjutkan praktik di area dangkal.",
    tugas: "Rancang flowchart yang menggambarkan urutan tindakan mitigasi dengan mempertimbangkan lebih dari satu kondisi cuaca." },
  { id: 6, title: "Kalibrasi Sensor Geolistrik", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa merangkai alat geolistrik dan menyalakannya. Alat melakukan booting dan self-test. Jika layar panel menunjukkan 'Error', siswa mengganti baterai dan merestart alat. Jika layar menunjukkan 'Ready', siswa menancapkan elektroda ke tanah. Alat mengukur resistansi tanah. Jika resistansi > 1000 ohm, siswa harus menyiram tanah dengan air garam. Jika <= 1000 ohm, pengukuran data dimulai.",
    tugas: "Buat algoritma tertulis dan terjemahkan menjadi flowchart yang memuat urutan kalibrasi beserta kondisi percabangannya." }, 
  { id: 7, title: "Sistem Pelaporan Hasil Pemetaan", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa selesai memetakan area dan mengunggah data koordinat ke sistem. Sistem memvalidasi format file. Jika format file salah, sistem menampilkan pesan 'Format Ditolak'. Jika benar, sistem memproses kalkulasi luas area. Selanjutnya, sistem mengecek apakah luas > 1 Hektar. Jika ya, tambahkan watermark 'Area Skala Besar' pada laporan. Terakhir, laporan dicetak oleh printer.",
    tugas: "Gambarkan flowchart dari sistem pelaporan tersebut, bedakan dengan jelas bentuk simbol proses dan simbol keputusan." },   
  { id: 8, title: "Prosedur Evakuasi Darurat", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Sensor mendeteksi getaran gempa. Sistem secara otomatis mematikan seluruh aliran listrik utama. Pengawas mengecek status sensor Terowongan A. Jika Terowongan A terdeteksi aman, semua siswa dievakuasi melalui Rute Utama dan berkumpul di Titik A. Jika Terowongan A terindikasi runtuh, pengawas membuka pintu Rute Alternatif B. Siswa mengambil senter darurat, lalu dievakuasi ke Titik B.",
    tugas: "Susun urutan kejadian dan pecahkan logika percabangannya ke dalam sebuah flowchart prosedur evakuasi." },    
  { id: 9, title: "Pemilahan Mutu Material Tambang", konsep: "Sequence + Decision", level: "Lanjut",
    skenario: "Siswa memasukkan bongkahan material ke dalam mesin pemecah (Crusher). Mesin menyaring material berdasarkan ukuran. Jika ukuran material > 5 cm, material dikeluarkan menuju mesin penghancur sekunder. Jika ukuran <= 5 cm, material bergerak melewati sensor warna. Jika warna material dominan gelap, material diarahkan ke Conveyor A. Jika terang, material diarahkan ke Conveyor B.",
    tugas: "Buat flowchart lengkap yang menggabungkan beberapa tahapan proses berurutan dengan dua titik pengambilan keputusan." }
];


let selectedFcCase = null;
let fcNodesData = []; 

document.addEventListener("DOMContentLoaded", () => {
  const dciSelect = document.getElementById("dci-material-select");
  const oldContainer = document.querySelector(".dci-container");
  const newContainer = document.getElementById("dci-flowchart-workspace");
  const caseContainer = document.getElementById("fc-cases-container");
  const standardStepper = document.querySelector(".dci-header > .dci-stepper-wrapper");
  const headerTitle = document.getElementById("dciHeaderTitle");

  const updateDciHeader = () => {
    const isFlowchart = dciSelect.value === "6";
    standardStepper.classList.toggle("d-none", isFlowchart);
    headerTitle.textContent = isFlowchart
      ? "DIGITAL CASE INVESTIGATION - FLOWCHART"
      : "DIGITAL CASE INVESTIGATION";
  };

  const renderFlowchartCases = () => {
    caseContainer.replaceChildren();
    fcCases.forEach((k) => {
      const selectedByGroup = localStorage.getItem(`case_taken_${k.id}`);
      const isTaken = Boolean(selectedByGroup);
      const cardColumn = document.createElement("div");
      cardColumn.className = "col-md-6 col-lg-4";
      const card = document.createElement("div");
      card.className = `fc-case-card ${isTaken ? "disabled" : ""}`;
      const statusBadge = document.createElement("span");
      statusBadge.className = `badge ${isTaken ? "bg-secondary" : "bg-success"} mb-2`;
      statusBadge.textContent = isTaken ? `Dipilih Kel. ${selectedByGroup}` : "Tersedia";
      const caseNumber = document.createElement("div");
      caseNumber.className = "fw-bold small text-primary";
      caseNumber.textContent = `KASUS ${k.id}`;
      const title = document.createElement("h6");
      title.className = "fw-bold mt-1";
      title.textContent = k.title;
      const concept = document.createElement("div");
      concept.className = "small text-muted mt-2";
      concept.innerHTML = `<strong>Konsep:</strong> ${k.konsep}`;
      const level = document.createElement("div");
      level.className = "small text-muted";
      level.innerHTML = `<strong>Level:</strong> ${k.level}`;
      card.append(statusBadge, caseNumber, title, concept, level);
      card.addEventListener("click", () => pilihKasus(k.id, card));
      cardColumn.appendChild(card);
      caseContainer.appendChild(cardColumn);
    });
  };
  renderFlowchartCases();
  setupFlowchartBuilder();

  document.getElementById("btnResetFlowchartCases").addEventListener("click", () => {
    const shouldReset = confirm("Reset semua status kasus Flowchart agar dapat digunakan kembali untuk kelas berikutnya?");
    if (!shouldReset) return;

    fcCases.forEach((flowchartCase) => localStorage.removeItem(`case_taken_${flowchartCase.id}`));
    selectedFcCase = null;
    renderFlowchartCases();
    document.getElementById("fc-judul-kasus").textContent = "Judul Kasus";
    document.getElementById("fc-konsep-kasus").textContent = "";
    document.getElementById("fc-tingkat-kasus").textContent = "";
    document.getElementById("fc-skenario-kasus").textContent = "";
    document.getElementById("fc-tugas-kasus").textContent = "";
    alert("Semua kasus Flowchart sekarang tersedia kembali di browser ini.");
  });

  // TAMPILKAN CONTAINER FLOWCHART JIKA MATERI 6
  if (dciSelect) {
    dciSelect.addEventListener("change", (e) => {
      if (e.target.value === "6") {
        if(oldContainer) oldContainer.classList.add("dci-d-none", "d-none");
        if(newContainer) newContainer.classList.remove("d-none");
        document.getElementById("dciDraftStatus").classList.add("d-none");
        document.getElementById("btnResetDci").classList.add("d-none");
      } else {
        if(oldContainer) oldContainer.classList.remove("dci-d-none", "d-none");
        if(newContainer) newContainer.classList.add("d-none");
        document.getElementById("dciDraftStatus").classList.remove("d-none");
        document.getElementById("btnResetDci").classList.remove("d-none");
      }
      updateDciHeader();
    });
    updateDciHeader();
  }

  // NAVIGASI STEPPER FLOWCHART
  document.querySelectorAll(".fc-btn-next").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextId = btn.getAttribute("data-next");
      if (nextId === "2") {
        const nama = document.getElementById("fc-nama").value.trim();
        const kelas = document.getElementById("fc-kelas").value.trim();
        const kelompok = document.getElementById("fc-kelompok").value;
        if (!nama || !kelas || !kelompok) return alert("Lengkapi nama perwakilan, kelas, dan nomor kelompok terlebih dahulu.");
        if (!selectedFcCase) return alert("Pilih kasus terlebih dahulu!");
        saveKasusSelection();
      }
      navigateToFlowchartRoom(Number(nextId));
    });
  });

  document.querySelectorAll(".fc-btn-prev").forEach(btn => {
    btn.addEventListener("click", () => {
      navigateToFlowchartRoom(Number(btn.getAttribute("data-prev")));
    });
  });

  document.querySelectorAll("#fc-stepper .step-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = Number(btn.dataset.fcStep);
      if (step === 10) generateReport();
      else navigateToFlowchartRoom(step);
    });
  });

  // AUTOSAVE KE LOCAL STORAGE
  document.querySelectorAll(".fc-autosave").forEach(input => {
    input.addEventListener("input", (e) => {
      const groupId = document.getElementById("fc-kelompok").value || "no_group";
      localStorage.setItem(`dci_fc_draft_${groupId}_${e.target.id}`, e.target.value);
      updateFcStepper(currentFcStep);
    });
  });

  ["fc-nama", "fc-kelas", "fc-kelompok"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => updateFcStepper(currentFcStep));
    document.getElementById(id).addEventListener("change", () => updateFcStepper(currentFcStep));
  });
  document.getElementById("fc-algoritma-container").addEventListener("input", () => updateFcStepper(currentFcStep));
  updateFcStepper(1);
});

function pilihKasus(id, el) {
  if (el.classList.contains("disabled")) return alert("Kasus sudah dipilih kelompok lain!");
  document.querySelectorAll(".fc-case-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedFcCase = fcCases.find(c => c.id === id);

  // Set Data ke Tahap 2
  document.getElementById("fc-judul-kasus").innerText = selectedFcCase.title;
  document.getElementById("fc-konsep-kasus").innerText = selectedFcCase.konsep;
  document.getElementById("fc-tingkat-kasus").innerText = selectedFcCase.level;
  document.getElementById("fc-skenario-kasus").innerText = selectedFcCase.skenario;
  document.getElementById("fc-tugas-kasus").innerText = selectedFcCase.tugas;
  updateFcStepper(currentFcStep);
}

function saveKasusSelection() {
  const kel = document.getElementById("fc-kelompok").value;
  if(kel) localStorage.setItem(`case_taken_${selectedFcCase.id}`, kel); // Tandai di local
}

let currentFcStep = 1;

function navigateToFlowchartRoom(roomNumber) {
  if (!Number.isInteger(roomNumber) || roomNumber < 1 || roomNumber > 10) return;
  if (roomNumber === 10) {
    generateReport();
    return;
  }

  document.querySelectorAll(".fc-room").forEach((room) => room.classList.add("d-none"));
  document.getElementById(`fc-room-${roomNumber}`).classList.remove("d-none");
  updateFcStepper(roomNumber);
}

function getFcStepStatus(step) {
  const hasAllValues = (values) => values.every((value) => String(value ?? "").trim());
  const valuesByStep = {
    1: [
      document.getElementById("fc-nama").value,
      document.getElementById("fc-kelas").value,
      document.getElementById("fc-kelompok").value,
      selectedFcCase?.id,
    ],
    2: [selectedFcCase?.id],
    3: Array.from({ length: 4 }, (_, index) => document.getElementById(`fc-ans-analisis-${index + 1}`).value),
    4: [
      document.getElementById("fc-ans-ipo-input").value,
      document.getElementById("fc-ans-ipo-proses").value,
      document.getElementById("fc-ans-ipo-output").value,
      ...(selectedFcCase?.konsep.includes("Decision")
        ? [document.getElementById("fc-ans-ipo-decision").value]
        : []),
      ...(selectedFcCase?.konsep.includes("Loop")
        ? [document.getElementById("fc-ans-ipo-loop").value]
        : []),
    ],
    5: Array.from(document.querySelectorAll(".fc-algo-input"), (input) => input.value),
    7: ["fc-ans-trace-input", "fc-ans-trace-path", "fc-ans-trace-q1", "fc-ans-trace-q2"]
      .map((id) => document.getElementById(id).value),
    8: ["fc-ans-eval-1", "fc-ans-eval-2", "fc-ans-eval-3"]
      .map((id) => document.getElementById(id).value),
    9: ["fc-ans-ref-1", "fc-ans-ref-2", "fc-ans-ref-3"]
      .map((id) => document.getElementById(id).value),
  };

  if (step === 6) {
    if (!fcNodesData.length) return "empty";
    const nodesAreComplete = fcNodesData.length >= 2 && fcNodesData.every((node) => node.text.trim());
    if (nodesAreComplete && fcConnectionsData.length > 0) return "complete";
    return "partial";
  }

  if (step === 10) {
    const statuses = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(getFcStepStatus);
    if (statuses.every((status) => status === "complete")) return "complete";
    return statuses.some((status) => status !== "empty") ? "partial" : "empty";
  }

  const values = valuesByStep[step] || [];
  const filledCount = values.filter((value) => String(value ?? "").trim()).length;
  if (!filledCount) return "empty";
  return hasAllValues(values) ? "complete" : "partial";
}

function updateFcStepper(step) {
  currentFcStep = Number(step);
  document.querySelectorAll("#fc-stepper .step-item").forEach(el => {
    const stepNumber = Number(el.dataset.fcStep);
    const status = getFcStepStatus(stepNumber);
    const label = el.querySelector(".step-label").textContent.trim();
    el.classList.remove("active", "completed", "status-empty", "status-partial", "status-complete");
    el.classList.add(`status-${status}`);
    if (stepNumber === currentFcStep) el.classList.add("active");
    el.setAttribute("aria-label", `${label}: ${
      status === "complete" ? "semua kolom sudah diisi" :
        status === "partial" ? "belum semua kolom diisi" : "belum diisi"
    }. Klik untuk membuka tahap.`);
  });
}

// LOGIKA DYNAMIC ALGORITMA
function addAlgoStep() {
  const container = document.getElementById("fc-algoritma-container");
  const num = container.children.length + 1;
  const html = `<div class="input-group mb-2"><span class="input-group-text">${num}</span><input type="text" class="form-control fc-algo-input"></div>`;
  container.insertAdjacentHTML('beforeend', html);
  updateFcStepper(currentFcStep);
}

// LOGIKA BUILDER FLOWCHART INTERAKTIF (TAHAP 6)
let selectedFlowNodeId = null;
let selectedFlowConnectionId = null;
let nextFlowNodeId = 1;
let nextFlowConnectionId = 1;
const FLOWCHART_CANVAS = { width: 900, height: 600, nodeWidth: 160, nodeHeight: 64 };

function setupFlowchartBuilder() {
  const groupInput = document.getElementById("fc-kelompok");
  groupInput.addEventListener("change", loadFlowchartBuilder);
  groupInput.addEventListener("blur", loadFlowchartBuilder);

  document.getElementById("fc-selected-node-text").addEventListener("input", (event) => {
    const node = fcNodesData.find((item) => item.id === selectedFlowNodeId);
    if (!node) return;
    node.text = event.target.value;
    const canvasLabel = document.querySelector(`[data-node-id="${node.id}"] .fc-node-label`);
    const listLabel = document.querySelector(`[data-node-list-id="${node.id}"] .fc-node-list-label`);
    if (canvasLabel) canvasLabel.textContent = node.text || "Klik untuk mengedit";
    if (listLabel) listLabel.textContent = node.text || "Belum ada teks";
    saveFlowchartBuilder();
    updateFcStepper(currentFcStep);
  });

  document.getElementById("fc-add-connection").addEventListener("click", () => {
    const fromId = Number(document.getElementById("fc-connection-from").value);
    const toId = Number(document.getElementById("fc-connection-to").value);
    const fromNode = fcNodesData.find((node) => node.id === fromId);
    const toNode = fcNodesData.find((node) => node.id === toId);
    if (!fromNode || !toNode) return alert("Tambahkan minimal dua node untuk membuat panah.");
    if (fromId === toId) return alert("Panah tidak dapat kembali ke node yang sama. Pilih node tujuan berbeda.");

    const outgoingCount = fcConnectionsData.filter((connection) => connection.fromId === fromId).length;
    const labelInput = document.getElementById("fc-connection-label");
    const label = labelInput.value.trim() || (fromNode.type === "Decision" ? (outgoingCount === 0 ? "Ya" : "Tidak") : "");
    fcConnectionsData.push({
      id: nextFlowConnectionId++,
      fromId,
      toId,
      label,
      angle: 0,
      distance: 45,
    });
    labelInput.value = "";
    selectedFlowConnectionId = fcConnectionsData.at(-1).id;
    selectedFlowNodeId = null;
    renderFlowchart();
    saveFlowchartBuilder();
  });

  document.getElementById("fc-selected-connection-label").addEventListener("input", (event) => {
    const connection = fcConnectionsData.find((item) => item.id === selectedFlowConnectionId);
    if (!connection) return;
    connection.label = event.target.value;
    const label = document.querySelector(`[data-connection-label-id="${connection.id}"]`);
    const listLabel = document.querySelector(`[data-connection-list-id="${connection.id}"] .fc-connection-list-label`);
    if (label) label.textContent = connection.label;
    if (listLabel) listLabel.textContent = connection.label || "(tanpa teks)";
    saveFlowchartBuilder();
  });

  document.getElementById("fc-selected-connection-angle").addEventListener("input", (event) => {
    const connection = fcConnectionsData.find((item) => item.id === selectedFlowConnectionId);
    if (!connection) return;
    connection.angle = Number(event.target.value);
    renderFlowchartConnection(connection);
    saveFlowchartBuilder();
  });

  document.getElementById("fc-selected-connection-offset").addEventListener("input", (event) => {
    const connection = fcConnectionsData.find((item) => item.id === selectedFlowConnectionId);
    if (!connection) return;
    connection.distance = Number(event.target.value);
    renderFlowchartConnection(connection);
    saveFlowchartBuilder();
  });

  document.getElementById("fc-delete-node").addEventListener("click", () => {
    fcNodesData = fcNodesData.filter((node) => node.id !== selectedFlowNodeId);
    fcConnectionsData = fcConnectionsData.filter((connection) => connection.fromId !== selectedFlowNodeId && connection.toId !== selectedFlowNodeId);
    selectedFlowNodeId = null;
    selectedFlowConnectionId = null;
    renderFlowchart();
    saveFlowchartBuilder();
  });

  document.getElementById("fc-delete-connection").addEventListener("click", () => {
    fcConnectionsData = fcConnectionsData.filter((connection) => connection.id !== selectedFlowConnectionId);
    selectedFlowConnectionId = null;
    renderFlowchart();
    saveFlowchartBuilder();
  });

  renderFlowchart();
}

function addFlowNode() {
  const type = document.getElementById("fc-node-type").value;
  const index = fcNodesData.length;
  fcNodesData.push({
    id: nextFlowNodeId++,
    type,
    text: "",
    x: 110 + (index % 4) * 215,
    y: 75 + Math.floor(index / 4) * 125,
  });
  selectedFlowNodeId = fcNodesData.at(-1).id;
  selectedFlowConnectionId = null;
  renderFlowchart();
  saveFlowchartBuilder();
  document.getElementById("fc-selected-node-text").focus();
}

function resetFlowchart() {
  fcNodesData = [];
  fcConnectionsData = [];
  selectedFlowNodeId = null;
  selectedFlowConnectionId = null;
  nextFlowNodeId = 1;
  nextFlowConnectionId = 1;
  renderFlowchart();
  saveFlowchartBuilder();
}

function renderFlowchart() {
  const list = document.getElementById("fc-node-list");
  const connectionList = document.getElementById("fc-connection-list");
  const canvas = document.getElementById("fc-node-canvas");
  const layer = document.getElementById("fc-connection-layer");
  const emptyCanvas = document.getElementById("fc-empty-canvas");
  list.replaceChildren();
  connectionList.replaceChildren();
  canvas.replaceChildren();
  layer.replaceChildren();
  emptyCanvas.classList.toggle("d-none", fcNodesData.length > 0);

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "fc-arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "8");
  marker.setAttribute("refY", "5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");
  const markerShape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  markerShape.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
  markerShape.setAttribute("fill", "#52607a");
  marker.appendChild(markerShape);
  defs.appendChild(marker);
  layer.appendChild(defs);

  fcNodesData.forEach((node, index) => {
    const row = document.createElement("div");
    row.className = `fc-node-list-item ${selectedFlowNodeId === node.id ? "selected" : ""}`;
    row.dataset.nodeListId = node.id;
    const selectNode = document.createElement("button");
    selectNode.type = "button";
    selectNode.className = "fc-node-list-select";
    const nodeName = document.createElement("strong");
    nodeName.textContent = `${index + 1}. [${node.type}] `;
    const nodeText = document.createElement("span");
    nodeText.className = "fc-node-list-label";
    nodeText.textContent = node.text || "Belum ada teks";
    selectNode.append(nodeName, nodeText);
    selectNode.addEventListener("click", () => {
      selectedFlowNodeId = node.id;
      selectedFlowConnectionId = null;
      renderFlowchart();
    });
    row.appendChild(selectNode);
    list.appendChild(row);

    const nodeElement = document.createElement("button");
    nodeElement.type = "button";
    nodeElement.className = `fc-node-preview ${getFlowNodeShape(node.type)} ${selectedFlowNodeId === node.id ? "selected" : ""}`;
    nodeElement.dataset.nodeId = node.id;
    nodeElement.style.left = `${node.x}px`;
    nodeElement.style.top = `${node.y}px`;
    nodeElement.setAttribute("aria-label", `Edit node ${node.text || index + 1}`);
    const nodeLabel = document.createElement("span");
    nodeLabel.className = "fc-node-label";
    nodeLabel.textContent = node.text || "Klik untuk mengedit";
    nodeElement.appendChild(nodeLabel);
    nodeElement.addEventListener("click", () => {
      selectedFlowNodeId = node.id;
      selectedFlowConnectionId = null;
      renderFlowchart();
    });
    nodeElement.addEventListener("pointerdown", (event) => startFlowNodeDrag(event, node));
    canvas.appendChild(nodeElement);
  });

  fcConnectionsData.forEach((connection, index) => {
    const fromNode = fcNodesData.find((node) => node.id === connection.fromId);
    const toNode = fcNodesData.find((node) => node.id === connection.toId);
    if (!fromNode || !toNode) return;
    renderFlowchartConnection(connection, index);

    const row = document.createElement("div");
    row.className = `fc-connection-list-item ${selectedFlowConnectionId === connection.id ? "selected" : ""}`;
    row.dataset.connectionListId = connection.id;
    const selectConnection = document.createElement("button");
    selectConnection.type = "button";
    selectConnection.className = "fc-connection-list-select";
    selectConnection.textContent = `${index + 1}. ${fromNode.text || `Node ${fromNode.id}`} → ${toNode.text || `Node ${toNode.id}`} · `;
    const connectionLabel = document.createElement("strong");
    connectionLabel.className = "fc-connection-list-label";
    connectionLabel.textContent = connection.label || "(tanpa teks)";
    selectConnection.appendChild(connectionLabel);
    selectConnection.addEventListener("click", () => {
      selectedFlowConnectionId = connection.id;
      selectedFlowNodeId = null;
      renderFlowchart();
    });
    row.appendChild(selectConnection);
    connectionList.appendChild(row);
  });

  updateFlowchartEditors();
  updateFlowConnectionOptions();
  updateFcStepper(currentFcStep);
}

let fcConnectionsData = [];

function renderFlowchartConnection(connection, order = fcConnectionsData.findIndex((item) => item.id === connection.id)) {
  const layer = document.getElementById("fc-connection-layer");
  const existingGroup = layer.querySelector(`[data-flow-connection-id="${connection.id}"]`);
  if (existingGroup) existingGroup.remove();
  const fromNode = fcNodesData.find((node) => node.id === connection.fromId);
  const toNode = fcNodesData.find((node) => node.id === connection.toId);
  if (!fromNode || !toNode) return;

  const { start, end, control, labelPoint } = getFlowConnectionGeometry(connection, fromNode, toNode);
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("data-flow-connection-id", String(connection.id));
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`);
  path.setAttribute("class", `fc-connection-path ${selectedFlowConnectionId === connection.id ? "selected" : ""}`);
  path.setAttribute("marker-end", "url(#fc-arrowhead)");
  path.setAttribute("tabindex", "0");
  path.setAttribute("role", "button");
  path.setAttribute("aria-label", `Panah ${order + 1}: ${connection.label || "tanpa teks"}`);
  path.addEventListener("click", () => {
    selectedFlowConnectionId = connection.id;
    selectedFlowNodeId = null;
    renderFlowchart();
  });
  group.appendChild(path);

  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", String(labelPoint.x));
  label.setAttribute("y", String(labelPoint.y - 8));
  label.setAttribute("class", `fc-connection-label ${selectedFlowConnectionId === connection.id ? "selected" : ""}`);
  label.setAttribute("data-connection-label-id", String(connection.id));
  label.textContent = connection.label;
  label.addEventListener("click", () => {
    selectedFlowConnectionId = connection.id;
    selectedFlowNodeId = null;
    renderFlowchart();
  });
  group.appendChild(label);
  layer.appendChild(group);
}

function getFlowConnectionGeometry(connection, fromNode, toNode) {
  const center = (node) => ({
    x: node.x + FLOWCHART_CANVAS.nodeWidth / 2,
    y: node.y + FLOWCHART_CANVAS.nodeHeight / 2,
  });
  const fromCenter = center(fromNode);
  const toCenter = center(toNode);
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const length = Math.hypot(dx, dy) || 1;
  const direction = { x: dx / length, y: dy / length };
  const normal = { x: -direction.y, y: direction.x };
  const angle = Number(connection.angle || 0) * Math.PI / 180;
  const distance = Number(connection.distance || 0);
  const midpoint = { x: (fromCenter.x + toCenter.x) / 2, y: (fromCenter.y + toCenter.y) / 2 };
  const sourceEdge = getFlowNodeBoundaryPoint(fromNode, {
    x: fromCenter.x + direction.x,
    y: fromCenter.y + direction.y,
  });
  const targetEdge = getFlowNodeBoundaryPoint(toNode, {
    x: toCenter.x - direction.x,
    y: toCenter.y - direction.y,
  });
  const minProjection = (sourceEdge.x - fromCenter.x) * direction.x +
    (sourceEdge.y - fromCenter.y) * direction.y + 8;
  const maxProjection = length +
    (targetEdge.x - toCenter.x) * direction.x +
    (targetEdge.y - toCenter.y) * direction.y - 8;
  const desiredOffset = {
    x: normal.x * Math.cos(angle) + direction.x * Math.sin(angle),
    y: normal.y * Math.cos(angle) + direction.y * Math.sin(angle),
  };
  const control = {
    x: midpoint.x + desiredOffset.x * distance,
    y: midpoint.y + desiredOffset.y * distance,
  };
  const desiredProjection = (control.x - fromCenter.x) * direction.x +
    (control.y - fromCenter.y) * direction.y;
  const projection = minProjection <= maxProjection
    ? Math.max(minProjection, Math.min(maxProjection, desiredProjection))
    : length / 2;
  const normalProjection = (control.x - midpoint.x) * normal.x +
    (control.y - midpoint.y) * normal.y;
  control.x = fromCenter.x + direction.x * projection + normal.x * normalProjection;
  control.y = fromCenter.y + direction.y * projection + normal.y * normalProjection;

  const start = getFlowNodeBoundaryPoint(fromNode, control, 4);
  const end = getFlowNodeBoundaryPoint(toNode, control, 10);
  return {
    start,
    end,
    control,
    labelPoint: {
      x: (start.x + 2 * control.x + end.x) / 4,
      y: (start.y + 2 * control.y + end.y) / 4,
    },
  };
}

function getFlowNodeBoundaryPoint(node, toward, outsideBy = 0) {
  const halfWidth = FLOWCHART_CANVAS.nodeWidth / 2;
  const halfHeight = FLOWCHART_CANVAS.nodeHeight / 2;
  const centerX = node.x + halfWidth;
  const centerY = node.y + halfHeight;
  const dx = toward.x - centerX;
  const dy = toward.y - centerY;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  let scale;

  if (node.type === "Start/End") {
    scale = 1 / Math.sqrt((dx * dx) / (halfWidth * halfWidth) + (dy * dy) / (halfHeight * halfHeight));
  } else if (node.type === "Decision") {
    scale = 1 / (absX / halfWidth + absY / halfHeight);
  } else if (node.type === "Input/Output") {
    const polygon = [
      { x: node.x + 14, y: node.y },
      { x: node.x + FLOWCHART_CANVAS.nodeWidth, y: node.y },
      { x: node.x + FLOWCHART_CANVAS.nodeWidth - 14, y: node.y + FLOWCHART_CANVAS.nodeHeight },
      { x: node.x, y: node.y + FLOWCHART_CANVAS.nodeHeight },
    ];
    let nearest = Infinity;
    for (let index = 0; index < polygon.length; index += 1) {
      const point = polygon[index];
      const next = polygon[(index + 1) % polygon.length];
      const edgeX = next.x - point.x;
      const edgeY = next.y - point.y;
      const denominator = dx * edgeY - dy * edgeX;
      if (Math.abs(denominator) < 1e-9) continue;
      const offsetX = point.x - centerX;
      const offsetY = point.y - centerY;
      const rayScale = (offsetX * edgeY - offsetY * edgeX) / denominator;
      const edgeScale = (offsetX * dy - offsetY * dx) / denominator;
      if (rayScale >= 0 && edgeScale >= 0 && edgeScale <= 1) nearest = Math.min(nearest, rayScale);
    }
    scale = nearest;
  } else {
    scale = Math.min(
      absX ? halfWidth / absX : Infinity,
      absY ? halfHeight / absY : Infinity,
    );
  }

  const boundaryX = centerX + dx * scale;
  const boundaryY = centerY + dy * scale;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: boundaryX + (dx / length) * outsideBy,
    y: boundaryY + (dy / length) * outsideBy,
  };
}

function renderFlowchartReport() {
  const svg = document.getElementById("fc-report-diagram");
  const emptyMessage = document.getElementById("fc-report-diagram-empty");
  svg.replaceChildren();
  emptyMessage.classList.toggle("d-none", fcNodesData.length > 0);
  svg.classList.toggle("d-none", fcNodesData.length === 0);
  if (!fcNodesData.length) return;

  const namespace = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(namespace, "defs");
  const marker = document.createElementNS(namespace, "marker");
  marker.setAttribute("id", "fc-report-arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "8");
  marker.setAttribute("refY", "5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");
  const arrowShape = document.createElementNS(namespace, "path");
  arrowShape.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
  arrowShape.setAttribute("fill", "#52607a");
  marker.appendChild(arrowShape);
  defs.appendChild(marker);
  svg.appendChild(defs);

  fcConnectionsData.forEach((connection) => {
    const fromNode = fcNodesData.find((node) => node.id === connection.fromId);
    const toNode = fcNodesData.find((node) => node.id === connection.toId);
    if (!fromNode || !toNode) return;
    const { start, end, control, labelPoint } = getFlowConnectionGeometry(connection, fromNode, toNode);
    const path = document.createElementNS(namespace, "path");
    path.setAttribute("d", `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`);
    path.setAttribute("class", "fc-report-connection");
    svg.appendChild(path);

    if (connection.label) {
      const label = document.createElementNS(namespace, "text");
      label.setAttribute("x", String(labelPoint.x));
      label.setAttribute("y", String(labelPoint.y - 8));
      label.setAttribute("class", "fc-report-connection-label");
      label.textContent = connection.label;
      svg.appendChild(label);
    }
  });

  fcNodesData.forEach((node) => {
    const group = document.createElementNS(namespace, "g");
    const x = node.x;
    const y = node.y;
    let shape;
    if (node.type === "Start/End") {
      shape = document.createElementNS(namespace, "ellipse");
      shape.setAttribute("cx", String(x + 80));
      shape.setAttribute("cy", String(y + 32));
      shape.setAttribute("rx", "78");
      shape.setAttribute("ry", "30");
      shape.setAttribute("stroke", "#dc3545");
    } else if (node.type === "Decision") {
      shape = document.createElementNS(namespace, "polygon");
      shape.setAttribute("points", `${x + 80},${y} ${x + 160},${y + 32} ${x + 80},${y + 64} ${x},${y + 32}`);
      shape.setAttribute("fill", "#fff3cd");
      shape.setAttribute("stroke", "#ffc107");
    } else if (node.type === "Input/Output") {
      shape = document.createElementNS(namespace, "polygon");
      shape.setAttribute("points", `${x + 14},${y} ${x + 160},${y} ${x + 146},${y + 64} ${x},${y + 64}`);
      shape.setAttribute("stroke", "#198754");
    } else {
      shape = document.createElementNS(namespace, "rect");
      shape.setAttribute("x", String(x + 2));
      shape.setAttribute("y", String(y + 2));
      shape.setAttribute("width", "156");
      shape.setAttribute("height", "60");
      shape.setAttribute("rx", "4");
      shape.setAttribute("stroke", "#0d6efd");
    }
    shape.setAttribute("fill", shape.getAttribute("fill") || "#fff");
    shape.setAttribute("stroke-width", "3");
    group.appendChild(shape);

    const lines = wrapFlowNodeText(node.text || "Tanpa teks", 17);
    const startY = y + FLOWCHART_CANVAS.nodeHeight / 2 - ((lines.length - 1) * 10);
    lines.forEach((line, index) => {
      const text = document.createElementNS(namespace, "text");
      text.setAttribute("x", String(x + FLOWCHART_CANVAS.nodeWidth / 2));
      text.setAttribute("y", String(startY + index * 20));
      text.setAttribute("class", "fc-report-node-text");
      text.textContent = line;
      group.appendChild(text);
    });
    svg.appendChild(group);
  });
}

function wrapFlowNodeText(text, maxLength) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    if (line && `${line} ${word}`.length > maxLength) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function getFlowNodeShape(type) {
  if (type === "Start/End") return "fc-node-oval";
  if (type === "Input/Output") return "fc-node-io";
  if (type === "Decision") return "fc-node-diamond";
  return "fc-node-rect";
}

function updateFlowchartEditors() {
  const nodeEditor = document.getElementById("fc-node-editor");
  const connectionEditor = document.getElementById("fc-connection-editor");
  const node = fcNodesData.find((item) => item.id === selectedFlowNodeId);
  const connection = fcConnectionsData.find((item) => item.id === selectedFlowConnectionId);
  nodeEditor.classList.toggle("d-none", !node);
  connectionEditor.classList.toggle("d-none", !connection);
  if (node) document.getElementById("fc-selected-node-text").value = node.text;
  if (connection) {
    document.getElementById("fc-selected-connection-label").value = connection.label;
    document.getElementById("fc-selected-connection-angle").value = connection.angle;
    document.getElementById("fc-selected-connection-offset").value = connection.distance;
  }
}

function updateFlowConnectionOptions() {
  ["fc-connection-from", "fc-connection-to"].forEach((id) => {
    const select = document.getElementById(id);
    const previousValue = select.value;
    select.replaceChildren();
    fcNodesData.forEach((node, index) => {
      const option = document.createElement("option");
      option.value = String(node.id);
      option.textContent = `${index + 1}. ${node.text || "Belum ada teks"} (${node.type})`;
      select.appendChild(option);
    });
    if (fcNodesData.some((node) => String(node.id) === previousValue)) select.value = previousValue;
    select.disabled = fcNodesData.length < 2;
  });
  document.getElementById("fc-add-connection").disabled = fcNodesData.length < 2;
}

function startFlowNodeDrag(event, node) {
  if (event.button !== 0) return;
  event.preventDefault();
  selectedFlowNodeId = node.id;
  selectedFlowConnectionId = null;
  document.querySelectorAll(".fc-node-preview, .fc-node-list-item").forEach((element) => element.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
  document.querySelector(`[data-node-list-id="${node.id}"]`)?.classList.add("selected");
  document.getElementById("fc-connection-editor").classList.add("d-none");
  document.getElementById("fc-node-editor").classList.remove("d-none");
  document.getElementById("fc-selected-node-text").value = node.text;
  const canvas = document.getElementById("fc-preview-area");
  const bounds = canvas.getBoundingClientRect();
  const scaleX = FLOWCHART_CANVAS.width / bounds.width;
  const scaleY = FLOWCHART_CANVAS.height / bounds.height;

  const moveNode = (moveEvent) => {
    node.x = Math.max(0, Math.min(FLOWCHART_CANVAS.width - FLOWCHART_CANVAS.nodeWidth, (moveEvent.clientX - bounds.left) * scaleX - FLOWCHART_CANVAS.nodeWidth / 2));
    node.y = Math.max(0, Math.min(FLOWCHART_CANVAS.height - FLOWCHART_CANVAS.nodeHeight, (moveEvent.clientY - bounds.top) * scaleY - FLOWCHART_CANVAS.nodeHeight / 2));
    renderFlowchart();
  };
  const stopMoving = () => {
    window.removeEventListener("pointermove", moveNode);
    window.removeEventListener("pointerup", stopMoving);
    saveFlowchartBuilder();
  };
  window.addEventListener("pointermove", moveNode);
  window.addEventListener("pointerup", stopMoving, { once: true });
}

function saveFlowchartBuilder() {
  const groupId = document.getElementById("fc-kelompok").value.trim() || "no_group";
  localStorage.setItem(`dci_fc_builder_${groupId}`, JSON.stringify({
    nodes: fcNodesData,
    connections: fcConnectionsData,
    nextNodeId: nextFlowNodeId,
    nextConnectionId: nextFlowConnectionId,
  }));
}

function loadFlowchartBuilder() {
  const groupId = document.getElementById("fc-kelompok").value.trim() || "no_group";
  const saved = localStorage.getItem(`dci_fc_builder_${groupId}`);
  if (!saved) {
    fcNodesData = [];
    fcConnectionsData = [];
    selectedFlowNodeId = null;
    selectedFlowConnectionId = null;
    nextFlowNodeId = 1;
    nextFlowConnectionId = 1;
    renderFlowchart();
    return;
  }
  try {
    const data = JSON.parse(saved);
    fcNodesData = Array.isArray(data.nodes) ? data.nodes : [];
    fcConnectionsData = Array.isArray(data.connections) ? data.connections : [];
    nextFlowNodeId = data.nextNodeId || fcNodesData.reduce((next, node) => Math.max(next, Number(node.id) + 1), 1);
    nextFlowConnectionId = data.nextConnectionId || fcConnectionsData.reduce((next, connection) => Math.max(next, Number(connection.id) + 1), 1);
    selectedFlowNodeId = null;
    selectedFlowConnectionId = null;
    renderFlowchart();
  } catch (error) {
    console.error("Gagal memuat draft flowchart:", error);
  }
}

// FUNGSI GENERATE REPORT (TAHAP Akhir)
function generateReport() {
  document.getElementById("rep-nama").innerText = document.getElementById("fc-nama").value;
  document.getElementById("rep-kelas").innerText = document.getElementById("fc-kelas").value;
  document.getElementById("rep-kelompok").innerText = document.getElementById("fc-kelompok").value;
  document.getElementById("rep-anggota").innerText = document.getElementById("fc-anggota").value;
  document.getElementById("rep-kasus").innerText = selectedFcCase ? selectedFcCase.title : "-";
  
  document.getElementById("rep-input").innerText = document.getElementById("fc-ans-ipo-input").value;
  document.getElementById("rep-proses").innerText = document.getElementById("fc-ans-ipo-proses").value;
  document.getElementById("rep-output").innerText = document.getElementById("fc-ans-ipo-output").value;
  
  document.getElementById("rep-eval").innerText = document.getElementById("fc-ans-eval-1").value;
  document.getElementById("rep-solusi").innerText = document.getElementById("fc-ans-eval-2").value;
  renderFlowchartReport();

  // Navigasi ke room 10
  document.querySelectorAll(".fc-room").forEach(r => r.classList.add("d-none"));
  document.getElementById("fc-room-10").classList.remove("d-none");
  updateFcStepper(10);
}

// SIMPAN KE GOOGLE APPS SCRIPT
function saveToBackend() {
  const button = document.getElementById("btnSubmitFlowchartDci");
  const status = document.getElementById("fc-submit-status");
  const nama = document.getElementById("fc-nama").value.trim();
  const kelas = document.getElementById("fc-kelas").value.trim();
  const kelompok = document.getElementById("fc-kelompok").value.trim();

  if (!nama || !kelas || !kelompok || !selectedFcCase) {
    status.textContent = "Lengkapi identitas kelompok dan pilih kasus sebelum mengirim.";
    status.className = "text-danger text-center small mt-3 mb-0";
    document.querySelector("#fc-stepper .step-item[data-fc-step='1']").click();
    return;
  }
  if (GOOGLE_APPS_SCRIPT_URL.includes("PASTE_")) {
    status.textContent = "URL Web App Google Apps Script belum dikonfigurasi.";
    status.className = "text-danger text-center small mt-3 mb-0";
    return;
  }

  const fieldValues = {};
  document.querySelectorAll("#dci-flowchart-workspace .fc-autosave").forEach((field) => {
    fieldValues[field.id] = field.value;
  });
  const data = {
    action: "saveFlowchartDCI",
    type: "dci_flowchart",
    materi: "Materi 6 - Flowchart",
    nama,
    kelas,
    kelompok,
    anggota: document.getElementById("fc-anggota").value.trim(),
    kasus: selectedFcCase.title,
    konsep: selectedFcCase.konsep,
    tingkat: selectedFcCase.level,
    analisis: {
      masalah: fieldValues["fc-ans-analisis-1"] || "",
      tujuan: fieldValues["fc-ans-analisis-2"] || "",
      langkah: fieldValues["fc-ans-analisis-3"] || "",
      kondisi: fieldValues["fc-ans-analisis-4"] || "",
    },
    ipo: {
      input: fieldValues["fc-ans-ipo-input"] || "",
      proses: fieldValues["fc-ans-ipo-proses"] || "",
      output: fieldValues["fc-ans-ipo-output"] || "",
      decision: fieldValues["fc-ans-ipo-decision"] || "",
      loop: fieldValues["fc-ans-ipo-loop"] || "",
    },
    algoritma: Array.from(document.querySelectorAll(".fc-algo-input"), (input) => input.value.trim()).filter(Boolean),
    flowchart: {
      nodes: fcNodesData,
      connections: fcConnectionsData,
    },
    tracing: {
      input: fieldValues["fc-ans-trace-input"] || "",
      jalur: fieldValues["fc-ans-trace-path"] || "",
      sesuai: fieldValues["fc-ans-trace-q1"] || "",
      decision: fieldValues["fc-ans-trace-q2"] || "",
    },
    evaluasi: {
      kelemahan: fieldValues["fc-ans-eval-1"] || "",
      solusi: fieldValues["fc-ans-eval-2"] || "",
      alasan: fieldValues["fc-ans-eval-3"] || "",
    },
    refleksi: {
      pemahaman: fieldValues["fc-ans-ref-1"] || "",
      kesulitan: fieldValues["fc-ans-ref-2"] || "",
      kolaborasi: fieldValues["fc-ans-ref-3"] || "",
    },
  };

  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Mengirim...';
  status.textContent = "";

  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  }).then(() => {
    status.textContent = "Permintaan pengiriman sudah diteruskan. Periksa spreadsheet DCI_Flowchart untuk memastikan data tercatat.";
    status.className = "text-success text-center small mt-3 mb-0";
  }).catch((error) => {
    console.error("Gagal mengirim DCI Flowchart:", error);
    status.textContent = "Pengiriman gagal. Periksa koneksi internet lalu coba kembali.";
    status.className = "text-danger text-center small mt-3 mb-0";
  }).finally(() => {
    button.disabled = false;
    button.innerHTML = '<i class="fa-solid fa-cloud-arrow-up me-2"></i> Kirim ke Sistem';
  });
}
