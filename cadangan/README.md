# Ujian Cadangan (Fisika) · Cloudflare Pages + Google Sheet

```
apps-script/Code.gs      → tempel di Apps Script milik Google Sheet
fisika/index.html        → halaman ujian siswa      (URL: /fisika/)
fisika/config.js         → SATU-SATUNYA file yang diubah per mapel
fisika-guru/index.html   → panel guru: hasil, analisis, editor soal, pengaturan (URL: /fisika-guru/)
soal-fisika.json         → 40 soal Anda (hasil konversi, lengkap dengan kunci), siap diimpor
```

## Pemasangan (sekali, ± 15 menit)

1. **Google Sheet.** Buat/buka Sheet mapel Fisika. Tab daftar siswa harus bernama **`Siswa`** dengan kolom
   `NIS | Nama | Kelas | Password | Status` (Status boleh kosong = BELUM).
2. **Apps Script.** Extensions > Apps Script. Hapus isi bawaan, tempel `Code.gs`, simpan. Muat ulang Sheet.
3. Menu **Ujian > Siapkan sheet** (setujui izin; tab Soal, Config, Jawaban, Arsip dibuat otomatis),
   lalu **Ujian > Atur kata sandi guru**.
4. **Deploy:** Terapkan > Deployment baru > jenis *Aplikasi web* > Jalankan sebagai **Saya** > Akses **Siapa saja** > Terapkan.
   Salin URL berakhiran `/exec`.
5. Buka `fisika/config.js`, tempel URL tadi di `API`. Salin folder `fisika/` dan `fisika-guru/` ke repo, push (Cloudflare Pages otomatis terbit).
6. Buka `/fisika-guru/`, login. Tab **Soal > Impor JSON** pilih `soal-fisika.json` > **Simpan ke Sheet**.
7. Tab **Pengaturan**: atur durasi dll. Skor tiap soal default 1 (ubah di editor soal). **Uji dengan satu siswa percobaan**
   sebelum hari H (lalu Reset dari tab Hasil). Terakhir, nyalakan saklar **Ujian AKTIF** di pojok kanan atas.

> Jika Anda mengubah `Code.gs` nanti: Terapkan > **Kelola deployment** > ikon pensil > Versi **Baru** > Terapkan (URL tidak berubah).

## Aturan main

| Situasi | Hasil |
|---|---|
| Siswa sudah SELESAI | Login menampilkan kode bukti, tidak bisa submit lagi |
| Ingin siswa mengulang | Tombol **Reset** di tab Hasil, **atau** ubah Status ke BELUM / hapus baris di tab Jawaban. Data lama dipindah ke tab **Arsip** |
| Browser siswa crash | Login lagi, tekan *Lanjutkan*: sisa waktu tetap benar (dihitung server), jawaban dipulihkan |
| Waktu habis | Jawaban dikirim otomatis (jeda acak 0–45 dtk agar server tidak tersedak). Kiriman diterima sampai 5 menit setelah batas; lewat itu yang dinilai adalah simpanan server terakhir, ditandai `terlambat` |
| Kunci/skor diubah setelah ujian | Tab Hasil > **Nilai ulang semua** |

**Penyimpanan jawaban:** tiap klik tersimpan di perangkat siswa; tombol *Simpan* mengirim cadangan ke server (jeda sesuai pengaturan,
dicek juga oleh server); ada juga cadangan otomatis tiap ±6–10 menit.

**Penilaian:** PG = skor penuh/0. PG kompleks = skor ÷ jumlah kunci per pilihan benar, tiap pilihan salah mengurangi, minimal 0.
Benar/Salah = skor ÷ jumlah pernyataan per pernyataan benar. Nilai akhir = poin mentah dinormalisasi ke 0–100.

**Catatan penting:** jangan ubah `No` soal setelah ada siswa yang mengumpulkan tanpa menjalankan *Nilai ulang semua*.
Nilai tidak ditampilkan ke siswa (hanya kode bukti), kecuali Anda aktifkan di Pengaturan.

## Mapel lain
1. File > Buat salinan Google Sheet (script ikut tersalin), jalankan *Siapkan sheet*, atur sandi guru, **deploy ulang** (URL baru).
2. Salin folder `fisika/` dan `fisika-guru/` menjadi mis. `kimia/` dan `kimia-guru/`.
3. Di `kimia/config.js` ganti `API` dan `MAPEL`; di `kimia-guru/index.html` ubah `../fisika/config.js` menjadi `../kimia/config.js`.

## Saran hari H (364 siswa)
Apps Script melayani ± 30 permintaan bersamaan. Jadwalkan per kelas/sesi (bukan seangkatan sekaligus), minta siswa login beberapa menit
sebelum mulai (login ringan, soal baru diunduh saat menekan *Mulai ujian*), dan lakukan uji coba 5–10 perangkat sekaligus.
