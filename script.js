/*
 * Tempel URL Web app Google Apps Script (yang berakhir dengan /exec)
 * setelah menjalankan langkah deployment pada file Code.gs.
 */
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMzA8DnKj415mgML49sBDjebDLiye_VUg9ZsNVcZdrpetDMWKGP-1MaddvtaQLqGrQ/exec';
const CLASS_OPTIONS = ['10 - TKI', '10 - TFLM', '10 - GP', '10 - TITL', '10 - TBKR'];
const MAX_LKM_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_LKM_EXTENSIONS = ['pdf', 'doc', 'docx'];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();

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
      <div class="d-flex ${success ? 'text-bg-success' : 'text-bg-primary'}">
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

  document.querySelectorAll('.task-form').forEach((form, index) => {
    const number = index + 1;
    form.querySelector('p').insertAdjacentHTML('afterend', `
      <div class="row g-2 mb-3">
        <div class="col-6"><label class="form-label" for="lkm-name-${number}">Nama</label><input class="form-control lkm-name" id="lkm-name-${number}" type="text" placeholder="Nama lengkap" required /></div>
        <div class="col-6"><label class="form-label" for="lkm-class-${number}">Kelas</label><select class="form-select lkm-class" id="lkm-class-${number}" required><option value="" selected disabled>Pilih kelas</option></select></div>
      </div>`);
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

      if (GOOGLE_APPS_SCRIPT_URL.startsWith('PASTE_')) {
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
        showToast('Permintaan unggah dikirim', 'Periksa tab "Log Pengumpulan LKM" pada spreadsheet untuk status dan tautan file.');
        form.reset();
        form.querySelector('.file-picker small').textContent = 'Belum ada file dipilih';
      } catch (error) {
        showToast('Pengiriman gagal', 'Periksa koneksi internet lalu coba lagi.', false);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Kumpulkan LKM';
      }
    });
  });

  document.querySelectorAll('.reflection-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (GOOGLE_APPS_SCRIPT_URL.startsWith('PASTE_')) {
        showToast('Koneksi belum selesai', 'Masukkan URL Web App Google Apps Script pada script.js.', false);
        return;
      }

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
        // mode no-cors diperlukan agar website statis dapat mengirim ke Apps Script.
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data),
        });
        showToast('Refleksi dikirim', 'Terima kasih. Refleksi telah dikirim ke spreadsheet.');
        form.reset();
      } catch (error) {
        showToast('Pengiriman gagal', 'Periksa koneksi internet dan URL Web App Apps Script.', false);
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
      showToast(link.dataset.test, 'Tambahkan URL Google Form atau platform kuis pada atribut href tautan ini.', false);
    });
  });

  const lkmFiles = [
    'Kasus 1-Infografis.docx',
    'Kasus 2-Infografis .docx',
    'Kasus 3-Infografis.docx',
    'Kasus 4-Infografis.docx',
    'Kasus 5-Infografis.docx',
    'Kasus 6-Infografis.docx',
    'Kasus 7-Infografis.docx',
    'Kasus 8-Infografis.docx',
    'Kasus 9-Infografis.docx',
  ];
  const materiFour = document.querySelector('#collapseFour .accordion-body');
  if (materiFour) {
    const downloadPanel = document.createElement('section');
    downloadPanel.className = 'lkm-download-panel';
    downloadPanel.innerHTML = `
      <h4><i class="fa-solid fa-download"></i> Unduh LKM</h4>
      <p>Pilih salah satu dari 9 LKM berikut untuk dikerjakan.</p>
      <div class="lkm-download-grid">
        ${lkmFiles.map((fileName, index) => `
          <a class="lkm-download-link" href="LKM/${fileName}" download>
            <span class="lkm-download-number">${String(index + 1).padStart(2, '0')}</span>
            <span><strong>LKM Kasus ${index + 1}</strong><small>Format DOCX</small></span>
            <i class="fa-solid fa-download"></i>
          </a>`).join('')}
      </div>`;
    materiFour.insertBefore(downloadPanel, materiFour.querySelector('.row.g-4'));
  }
});
