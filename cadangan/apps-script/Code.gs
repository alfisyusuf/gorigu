/**
 * Ujian Cadangan · backend Google Apps Script (terikat ke Google Sheet).
 * Deploy: Terapkan > Deployment baru > Aplikasi web
 *   Jalankan sebagai: Saya | Yang memiliki akses: Siapa saja
 * Tab yang dipakai: Siswa, Soal, Config, Jawaban, Arsip
 */
var SH = { siswa: 'Siswa', soal: 'Soal', config: 'Config', jawab: 'Jawaban', arsip: 'Arsip' };
var GRACE = 300;          // detik toleransi kirim setelah waktu habis
var TOKEN_JAM = 12;       // masa berlaku token siswa
var ADMIN_JAM = 8;        // masa berlaku token guru
var HEAD_JAWAB = ['NIS','Nama','Kelas','Mulai','Kumpul','Skor','Skor Maks','Nilai (0-100)','Kode Bukti',
  'Pindah Tab','Detik Di Luar','Metode','Simpan Terakhir','Simpan Manual','Jawaban (JSON)','Detail Skor (JSON)'];
var DEF_CONF = {
  judul: 'Ujian Fisika', mapel: 'Fisika', durasi: 90, aktif: false, acak_soal: true,
  wajib_lengkap: true, jeda_simpan: 5, tampil_skor: false, kode_prefix: 'FIS', pesan_nonaktif: 'Ujian belum dibuka.'
};

/* ============ MENU & SETUP ============ */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Ujian')
    .addItem('Siapkan sheet (jalankan sekali)', 'setupSheets')
    .addItem('Atur kata sandi guru', 'aturSandiGuru')
    .addItem('Kosongkan cache', 'kosongkanCache')
    .addToUi();
}
function setupSheets() {
  var ss = SpreadsheetApp.getActive();
  function mk(name, head) {
    var s = ss.getSheetByName(name) || ss.insertSheet(name);
    if (s.getLastRow() === 0) { s.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold'); s.setFrozenRows(1); }
    return s;
  }
  var sw = mk(SH.siswa, ['NIS','Nama','Kelas','Password','Status']);
  sw.getRange('A:A').setNumberFormat('@');
  mk(SH.soal, ['No','Tipe','HTML','Opsi (JSON)','Kunci (JSON)','Skor','Acak Opsi']);
  var cf = mk(SH.config, ['Kunci','Nilai']);
  if (cf.getLastRow() < 2) {
    var rows = Object.keys(DEF_CONF).map(function (k) { return [k, DEF_CONF[k]]; });
    cf.getRange(2, 1, rows.length, 2).setValues(rows);
  }
  var j = mk(SH.jawab, HEAD_JAWAB); j.getRange('A:A').setNumberFormat('@');
  var a = mk(SH.arsip, HEAD_JAWAB.concat(['Diarsipkan'])); a.getRange('A:A').setNumberFormat('@');
  secret_();
  SpreadsheetApp.getUi().alert('Sheet siap. Lanjut: menu Ujian > Atur kata sandi guru.');
}
function aturSandiGuru() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt('Kata sandi guru (minimal 8 karakter)');
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var p = r.getResponseText().trim();
  if (p.length < 8) { ui.alert('Terlalu pendek.'); return; }
  PropertiesService.getScriptProperties().setProperty('ADMIN_PW', p);
  ui.alert('Tersimpan.');
}
function kosongkanCache() { CacheService.getScriptCache().removeAll(['siswa', 'conf', 'soal_n']); bust_(); }

/* ============ ROUTER ============ */
function doGet() { return out_({ ok: true, pesan: 'API ujian aktif' }); }
function doPost(e) {
  var res;
  try {
    var b = JSON.parse(e.postData.contents);
    var fn = ACT[b.a];
    res = fn ? fn(b) : { ok: false, err: 'Aksi tidak dikenal' };
  } catch (err) {
    res = { ok: false, err: err && err.msg ? err.msg : 'Server sibuk atau galat. Coba lagi.', retry: !(err && err.msg), log: String(err) };
  }
  return out_(res);
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function fail_(msg) { throw { msg: msg }; }

var ACT = {
  login: login_, mulai: mulai_, simpan: simpan_, kumpul: kumpul_,
  a_login: aLogin_, a_get: aGet_, a_save_soal: aSaveSoal_, a_save_config: aSaveConfig_,
  a_hasil: aHasil_, a_detail: aDetail_, a_reset: aReset_, a_nilai_ulang: aNilaiUlang_
};

/* ============ UTIL ============ */
function secret_() {
  var p = PropertiesService.getScriptProperties(), s = p.getProperty('SECRET');
  if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); p.setProperty('SECRET', s); }
  return s;
}
function b64u_(bytes) { return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/, ''); }
function sign_(str) { return b64u_(Utilities.computeHmacSha256Signature(str, secret_())); }
function mkToken_(who, jam) {
  var p = who + '|' + (Date.now() + jam * 3600000);
  return b64u_(Utilities.newBlob(p).getBytes()) + '.' + sign_(p);
}
function readToken_(t) {
  try {
    var parts = String(t || '').split('.');
    var p = Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0] + '==')).getDataAsString();
    if (sign_(p) !== parts[1]) return null;
    var x = p.split('|');
    if (Number(x[1]) < Date.now()) return null;
    return x[0];
  } catch (e) { return null; }
}
function sheet_(n) { var s = SpreadsheetApp.getActive().getSheetByName(n); if (!s) fail_('Sheet "' + n + '" belum ada. Jalankan menu Ujian > Siapkan sheet.'); return s; }
function bool_(v) { return v === true || String(v).toUpperCase() === 'TRUE'; }
function ms_(v) { return v instanceof Date ? v.getTime() : 0; }
function str_(v) { return String(v == null ? '' : v).trim(); }
function cacheGet_(k) { var v = CacheService.getScriptCache().get(k); return v ? JSON.parse(v) : null; }
function cachePut_(k, o, sec) { try { CacheService.getScriptCache().put(k, JSON.stringify(o), sec); } catch (e) {} }
function cacheGetBig_(k) {
  var c = CacheService.getScriptCache(), n = c.get(k + '_n');
  if (!n) return null;
  var keys = []; for (var i = 0; i < Number(n); i++) keys.push(k + '_' + i);
  var m = c.getAll(keys), s = '';
  for (var j = 0; j < keys.length; j++) { if (m[keys[j]] == null) return null; s += m[keys[j]]; }
  return JSON.parse(s);
}
function cachePutBig_(k, o, sec) {
  try {
    var s = JSON.stringify(o), c = CacheService.getScriptCache(), CH = 90000, kv = {}, n = Math.ceil(s.length / CH);
    for (var i = 0; i < n; i++) kv[k + '_' + i] = s.substr(i * CH, CH);
    kv[k + '_n'] = String(n);
    c.putAll(kv, sec);
  } catch (e) {}
}
function bust_() {
  var c = CacheService.getScriptCache(), n = c.get('soal_n'), ks = ['soal_n'];
  for (var i = 0; i < Number(n || 0); i++) ks.push('soal_' + i);
  c.removeAll(ks.concat(['conf', 'siswa']));
}
function hash_(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng_(seed) { var a = seed; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuf_(arr, rnd) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function round_(x) { return Math.round(x * 10000) / 10000; }

/* ============ DATA ============ */
function conf_() {
  var c = cacheGet_('conf');
  if (c) return c;
  var v = sheet_(SH.config).getDataRange().getValues(), o = {};
  for (var k in DEF_CONF) o[k] = DEF_CONF[k];
  for (var i = 1; i < v.length; i++) if (v[i][0] !== '') o[String(v[i][0]).trim()] = v[i][1];
  o.durasi = Number(o.durasi) || 90; o.jeda_simpan = Number(o.jeda_simpan) || 5;
  ['aktif', 'acak_soal', 'wajib_lengkap', 'tampil_skor'].forEach(function (k) { o[k] = bool_(o[k]); });
  cachePut_('conf', o, 30);
  return o;
}
function soal_() {
  var c = cacheGetBig_('soal');
  if (c) return c;
  var s = sheet_(SH.soal), n = s.getLastRow() - 1;
  if (n < 1) return [];
  var v = s.getRange(2, 1, n, 7).getValues(), r = [];
  v.forEach(function (x) {
    if (x[0] === '') return;
    r.push({ no: Number(x[0]), type: String(x[1]), html: String(x[2]), opts: JSON.parse(x[3] || '[]'),
      key: JSON.parse(x[4] || '[]'), skor: Number(x[5]) || 0, acakOpsi: bool_(x[6]) });
  });
  cachePutBig_('soal', r, 21600);
  return r;
}
function siswaMap_() {
  var m = cacheGet_('siswa');
  if (m) return m;
  var s = sheet_(SH.siswa), n = s.getLastRow() - 1; m = {};
  if (n > 0) s.getRange(2, 1, n, 4).getValues().forEach(function (x, i) {
    var nis = str_(x[0]); if (nis) m[nis] = { nama: str_(x[1]), kelas: str_(x[2]), pw: str_(x[3]), row: i + 2 };
  });
  cachePut_('siswa', m, 120);
  return m;
}
/** Ambil siswa + status terkini (baca langsung dari sel). */
function siswa_(nis) {
  var m = siswaMap_(), s = m[nis];
  if (s) {
    var r = sheet_(SH.siswa).getRange(s.row, 1, 1, 5).getValues()[0];
    if (str_(r[0]) !== nis) { CacheService.getScriptCache().remove('siswa'); m = siswaMap_(); s = m[nis]; if (!s) return null; r = sheet_(SH.siswa).getRange(s.row, 1, 1, 5).getValues()[0]; }
    s.status = str_(r[4]).toUpperCase() || 'BELUM';
  }
  return s || null;
}
function setStatus_(s, st) { sheet_(SH.siswa).getRange(s.row, 5).setValue(st); }
function jRow_(nis) {
  var sh = sheet_(SH.jawab), n = sh.getLastRow() - 1;
  if (n < 1) return null;
  var col = sh.getRange(2, 1, n, 1).getValues();
  for (var i = col.length - 1; i >= 0; i--) if (str_(col[i][0]) === nis) {
    return { row: i + 2, v: sh.getRange(i + 2, 1, 1, 16).getValues()[0] };
  }
  return null;
}
function arsip_(row) {
  var sh = sheet_(SH.jawab), v = sh.getRange(row, 1, 1, 16).getValues()[0];
  var a = sheet_(SH.arsip); a.appendRow(v.concat([new Date()]));
  sh.deleteRow(row);
}
function auth_(b) {
  var nis = readToken_(b.t);
  if (!nis || nis === 'ADM') fail_('Sesi berakhir. Silakan login ulang.');
  var s = siswa_(nis); if (!s) fail_('Akun tidak ditemukan.');
  s.nis = nis; return s;
}

/* ============ PENILAIAN ============ */
function skorSoal_(q, a) {
  var k = q.key, sk = q.skor, i;
  if (q.type === 'pg') return a && a === k[0] ? sk : 0;
  if (!Array.isArray(a)) return 0;
  var per = sk / k.length;
  if (q.type === 'pgk') {
    var ok = 0, no = 0; a.forEach(function (x) { if (k.indexOf(x) > -1) ok++; else no++; });
    return round_(Math.max(0, (ok - no) * per));
  }
  var b = 0; for (i = 0; i < k.length; i++) if (a[i] === k[i]) b++;
  return round_(b * per);
}
function lengkap_(q, a) {
  if (q.type === 'pg') return typeof a === 'string' && /^[A-E]$/.test(a);
  if (!Array.isArray(a)) return false;
  if (q.type === 'pgk') return a.length === q.key.length;
  if (a.length !== q.opts.length) return false;
  for (var i = 0; i < a.length; i++) if (a[i] !== 'T' && a[i] !== 'F') return false;
  return true;
}
function nilai_(ans, SO) {
  var tot = 0, mx = 0, det = {};
  SO.forEach(function (q) { var e = skorSoal_(q, ans[q.no]); det[q.no] = e; tot += e; mx += q.skor; });
  tot = round_(tot);
  return { skor: tot, maks: round_(mx), nilai: mx ? Math.round(tot / mx * 10000) / 100 : 0, det: det };
}
function kode_(nis, t, pref) {
  var h = Utilities.computeHmacSha256Signature('K|' + nis + '|' + t, secret_());
  var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '';
  for (var i = 0; i < 8; i++) s += A.charAt((h[i] & 0xff) % A.length);
  return (pref || 'FIS') + '-' + s.substr(0, 4) + '-' + s.substr(4);
}

/* ============ SISWA ============ */
function login_(b) {
  var nis = str_(b.nis), pw = str_(b.pw), c = CacheService.getScriptCache(), fk = 'gagal_' + nis;
  if (!nis || !pw) fail_('Isi NIS dan kata sandi.');
  if (Number(c.get(fk) || 0) >= 5) fail_('Terlalu banyak percobaan salah. Tunggu 5 menit atau hubungi pengawas.');
  var s = siswa_(nis);
  if (!s || s.pw !== pw) { c.put(fk, String(Number(c.get(fk) || 0) + 1), 300); fail_('NIS atau kata sandi salah.'); }
  c.remove(fk);
  var cf = conf_(), j = jRow_(nis);
  if (s.status === 'SELESAI' && (!j || j.v[4])) {
    return { ok: false, sudah: true, nama: s.nama, kode: j ? j.v[8] : '', err: 'Kamu sudah mengumpulkan jawaban.' };
  }
  if (!cf.aktif) fail_(cf.pesan_nonaktif || 'Ujian belum dibuka.');
  var sisa = null;
  if (j && !j.v[4]) sisa = Math.round(cf.durasi * 60 - (Date.now() - ms_(j.v[3])) / 1000);
  return { ok: true, t: mkToken_(nis, TOKEN_JAM), nama: s.nama, kelas: s.kelas, nis: nis, judul: cf.judul, mapel: cf.mapel,
    durasi: cf.durasi, jumlah: soal_().length, lanjut: sisa !== null, sisa: sisa };
}
function mulai_(b) {
  var s = auth_(b), cf = conf_();
  if (!cf.aktif) fail_(cf.pesan_nonaktif || 'Ujian belum dibuka.');
  var j = jRow_(s.nis);
  if (j && j.v[4]) {
    if (s.status === 'SELESAI') fail_('Kamu sudah mengumpulkan jawaban.');
    arsip_(j.row); j = null;           // status diubah guru: mulai ulang
  }
  if (!j && s.status === 'SELESAI') { /* submission dihapus guru: boleh mulai lagi */ }
  if (!j) {
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(25000)) fail_('Server sibuk. Coba lagi sebentar.');
    try {
      j = jRow_(s.nis);
      if (!j) {
        var sh = sheet_(SH.jawab), r = sh.getLastRow() + 1;
        sh.getRange(r, 1, 1, 16).setNumberFormat('@').setNumberFormat('General');
        sh.getRange(r, 1).setNumberFormat('@');
        sh.getRange(r, 1, 1, 6).setValues([[s.nis, s.nama, s.kelas, new Date(), '', '']]);
        j = jRow_(s.nis);
      }
    } finally { lock.releaseLock(); }
    setStatus_(s, 'SEDANG');
  }
  var sisa = Math.round(cf.durasi * 60 - (Date.now() - ms_(j.v[3])) / 1000);
  if (sisa < -GRACE) { var d0 = {}; try { d0 = JSON.parse(j.v[14] || '{}'); } catch (e) {} var r2 = finalize_(s, j, d0, 'terlambat', 0, 0, cf); return { ok: false, selesai: true, kode: r2.kode, err: 'Waktu ujian sudah habis. Jawaban terakhir yang tersimpan dikumpulkan otomatis.' }; }
  var SO = soal_(), rnd = rng_(hash_(s.nis + '|abbs'));
  var order = cf.acak_soal ? shuf_(SO.map(function (q, i) { return i; }), rnd) : SO.map(function (q, i) { return i; });
  var view = order.map(function (i) {
    var q = SO[i], idx = q.opts.map(function (o, k) { return k; });
    if (q.acakOpsi && q.type !== 'bs') idx = shuf_(idx, rng_(hash_(s.nis + '|o' + q.no)));
    return { no: q.no, type: q.type, html: q.html,
      opts: idx.map(function (k) { return { id: q.type === 'bs' ? k : 'ABCDE'.charAt(k), h: q.opts[k] }; }),
      pilih: q.type === 'pgk' ? q.key.length : 0 };
  });
  var draft = {}; try { draft = JSON.parse(j.v[14] || '{}'); } catch (e) {}
  return { ok: true, soal: view, draft: draft, sisa: sisa, jeda: cf.jeda_simpan * 60,
    wajib: cf.wajib_lengkap, pindah: Number(j.v[9]) || 0, jauh: Number(j.v[10]) || 0,
    tunggu: Math.max(0, Math.ceil(cf.jeda_simpan * 60 - (Date.now() - ms_(j.v[13])) / 1000)) };
}
function simpan_(b) {
  var s = auth_(b), cf = conf_(), j = jRow_(s.nis);
  if (!j) fail_('Sesi ujian belum dimulai.');
  if (j.v[4]) return { ok: true, selesai: true };
  var now = Date.now(), sisa = cf.durasi * 60 - (now - ms_(j.v[3])) / 1000;
  if (sisa < -GRACE) return { ok: false, habis: true, err: 'Waktu habis.' };
  if (b.manual) {
    var w = Math.ceil(cf.jeda_simpan * 60 - (now - ms_(j.v[13])) / 1000);
    if (w > 0) return { ok: false, tunggu: w, err: 'Tunggu ' + w + ' detik lagi untuk menyimpan ke server.' };
  } else if (now - ms_(j.v[12]) < 90000) return { ok: true, dilewati: true, sisa: Math.round(sisa) };
  var a = JSON.stringify(b.j || {});
  if (a.length > 40000) fail_('Data jawaban terlalu besar.');
  var sh = sheet_(SH.jawab);
  sh.getRange(j.row, 10, 1, 6).setValues([[Math.max(Number(j.v[9]) || 0, Number(b.pindah) || 0), Math.max(Number(j.v[10]) || 0, Number(b.jauh) || 0),
    j.v[11], new Date(now), b.manual ? new Date(now) : (j.v[13] || ''), a]]);
  return { ok: true, waktu: now, jeda: cf.jeda_simpan * 60, sisa: Math.round(sisa) };
}
function kumpul_(b) {
  var s = auth_(b), cf = conf_(), j = jRow_(s.nis);
  if (!j) fail_('Sesi ujian belum dimulai.');
  if (j.v[4]) return { ok: true, sudah: true, kode: j.v[8], waktu: ms_(j.v[4]) };
  var now = Date.now(), late = now > ms_(j.v[3]) + (cf.durasi * 60 + GRACE) * 1000, SO = soal_(), ans = b.j || {};
  if (late) { try { ans = JSON.parse(j.v[14] || '{}'); } catch (e) { ans = {}; } }
  else if (cf.wajib_lengkap && !b.auto) {
    var kosong = SO.filter(function (q) { return !lengkap_(q, ans[q.no]); }).map(function (q) { return q.no; });
    if (kosong.length) return { ok: false, lengkap: false, kosong: kosong, err: 'Masih ada soal yang belum lengkap.' };
  }
  var r = finalize_(s, j, ans, late ? 'terlambat' : (b.auto ? 'otomatis' : 'manual'), b.pindah, b.jauh, cf);
  var res = { ok: true, kode: r.kode, waktu: now };
  if (cf.tampil_skor) res.nilai = r.nilai;
  return res;
}
function finalize_(s, j, ans, metode, pindah, jauh, cf) {
  var SO = soal_(), n = nilai_(ans, SO), now = new Date(), kode = kode_(s.nis, now.getTime(), cf.kode_prefix);
  var sh = sheet_(SH.jawab);
  sh.getRange(j.row, 5, 1, 12).setValues([[now, n.skor, n.maks, n.nilai, kode,
    Math.max(Number(j.v[9]) || 0, Number(pindah) || 0), Math.max(Number(j.v[10]) || 0, Number(jauh) || 0),
    metode, now, j.v[13] || '', JSON.stringify(ans), JSON.stringify(n.det)]]);
  setStatus_(s, 'SELESAI');
  n.kode = kode; return n;
}

/* ============ GURU ============ */
function aLogin_(b) {
  var c = CacheService.getScriptCache(), g = Number(c.get('gagal_adm') || 0);
  if (g >= 8) fail_('Terlalu banyak percobaan. Tunggu 10 menit.');
  var pw = PropertiesService.getScriptProperties().getProperty('ADMIN_PW');
  if (!pw) fail_('Kata sandi guru belum diatur (menu Ujian di Google Sheet).');
  if (str_(b.pw) !== pw) { c.put('gagal_adm', String(g + 1), 600); fail_('Kata sandi salah.'); }
  c.remove('gagal_adm');
  return { ok: true, t: mkToken_('ADM', ADMIN_JAM) };
}
function admin_(b) { if (readToken_(b.t) !== 'ADM') fail_('Sesi guru berakhir. Login ulang.'); }
function aGet_(b) {
  admin_(b); CacheService.getScriptCache().remove('conf');
  return { ok: true, config: conf_(), soal: soal_(), jumlahSiswa: Object.keys(siswaMap_()).length };
}
function aSaveSoal_(b) {
  admin_(b);
  var L = b.soal; if (!Array.isArray(L) || !L.length) fail_('Daftar soal kosong.');
  var seen = {}, rows = [];
  L.forEach(function (q, i) {
    var no = Number(q.no), p = 'Soal #' + (i + 1) + ': ';
    if (!no || seen[no]) fail_(p + 'nomor kosong atau ganda.'); seen[no] = 1;
    if (['pg', 'pgk', 'bs'].indexOf(q.type) < 0) fail_(p + 'tipe tidak valid.');
    if (!q.html || !Array.isArray(q.opts) || !q.opts.length) fail_(p + 'teks/opsi kosong.');
    if (q.type !== 'bs' && q.opts.length > 5) fail_(p + 'maksimal 5 opsi.');
    var k = q.key;
    if (!Array.isArray(k) || !k.length) fail_(p + 'kunci kosong.');
    if (q.type === 'pg' && (k.length !== 1 || !/^[A-E]$/.test(k[0]))) fail_(p + 'kunci PG harus satu huruf A-E.');
    if (q.type === 'pgk' && !k.every(function (x) { return /^[A-E]$/.test(x); })) fail_(p + 'kunci harus huruf A-E.');
    if (q.type === 'bs' && (k.length !== q.opts.length || !k.every(function (x) { return x === 'T' || x === 'F'; }))) fail_(p + 'kunci B/S harus T/F sebanyak pernyataan.');
    var o = JSON.stringify(q.opts);
    if (q.html.length > 48000 || o.length > 48000) fail_(p + 'isi terlalu panjang (batas sel 50.000 karakter).');
    rows.push([no, q.type, q.html, o, JSON.stringify(k), Number(q.skor) || 0, !!q.acakOpsi]);
  });
  var sh = sheet_(SH.soal), last = sh.getLastRow();
  if (last > 1) sh.getRange(2, 1, last - 1, 7).clearContent();
  sh.getRange(2, 1, rows.length, 7).setNumberFormat('@').setNumberFormat('General').setValues(rows);
  sh.getRange(2, 3, rows.length, 3).setNumberFormat('@').setValues(rows.map(function (r) { return [r[2], r[3], r[4]]; }));
  bust_();
  return { ok: true, jumlah: rows.length };
}
function aSaveConfig_(b) {
  admin_(b);
  var c = b.config || {}, sh = sheet_(SH.config), v = sh.getDataRange().getValues(), done = {};
  for (var i = 1; i < v.length; i++) { var k = String(v[i][0]).trim(); if (k in DEF_CONF && k in c) { sh.getRange(i + 1, 2).setValue(c[k]); done[k] = 1; } }
  for (var k2 in DEF_CONF) if (k2 in c && !done[k2]) sh.appendRow([k2, c[k2]]);
  CacheService.getScriptCache().remove('conf');
  return { ok: true, config: conf_() };
}
function aHasil_(b) {
  admin_(b);
  var m = siswaMap_(), sw = sheet_(SH.siswa), n = sw.getLastRow() - 1, rows = [];
  if (n < 1) return { ok: true, rows: [] };
  var sv = sw.getRange(2, 1, n, 5).getValues(), jh = sheet_(SH.jawab), jn = jh.getLastRow() - 1, J = {};
  if (jn > 0) jh.getRange(2, 1, jn, 16).getValues().forEach(function (x) { J[str_(x[0])] = x; });
  sv.forEach(function (x) {
    var nis = str_(x[0]); if (!nis) return;
    var j = J[nis], d = null;
    if (j) { try { d = JSON.parse(j[15] || 'null'); } catch (e) {} }
    rows.push({ nis: nis, nama: str_(x[1]), kelas: str_(x[2]), status: str_(x[4]).toUpperCase() || 'BELUM',
      mulai: j ? ms_(j[3]) : 0, kumpul: j ? ms_(j[4]) : 0, skor: j && j[4] ? j[5] : null, maks: j && j[4] ? j[6] : null,
      nilai: j && j[4] ? j[7] : null, kode: j ? j[8] : '', pindah: j ? j[9] : 0, jauh: j ? j[10] : 0, metode: j ? j[11] : '',
      simpan: j ? ms_(j[12]) : 0, d: d });
  });
  return { ok: true, rows: rows };
}
function aDetail_(b) {
  admin_(b);
  var j = jRow_(str_(b.nis)); if (!j) return { ok: true, ada: false };
  var a = {}, d = {}; try { a = JSON.parse(j.v[14] || '{}'); d = JSON.parse(j.v[15] || '{}'); } catch (e) {}
  return { ok: true, ada: true, jawaban: a, detail: d };
}
function aReset_(b) {
  admin_(b);
  var nis = str_(b.nis), s = siswa_(nis); if (!s) fail_('NIS tidak ditemukan.');
  var j = jRow_(nis); if (j) arsip_(j.row);
  setStatus_(s, 'BELUM');
  return { ok: true };
}
function aNilaiUlang_(b) {
  admin_(b);
  var sh = sheet_(SH.jawab), n = sh.getLastRow() - 1, SO = soal_(), c = 0;
  if (n < 1) return { ok: true, jumlah: 0 };
  var v = sh.getRange(2, 1, n, 16).getValues(), o = [];
  v.forEach(function (x) {
    if (x[4]) { var a = {}; try { a = JSON.parse(x[14] || '{}'); } catch (e) {} var r = nilai_(a, SO); o.push([r.skor, r.maks, r.nilai]); c++; }
    else o.push([x[5], x[6], x[7]]);
  });
  sh.getRange(2, 6, n, 3).setValues(o);
  var d = v.map(function (x) { if (!x[4]) return [x[15]]; var a = {}; try { a = JSON.parse(x[14] || '{}'); } catch (e) {} return [JSON.stringify(nilai_(a, SO).det)]; });
  sh.getRange(2, 16, n, 1).setValues(d);
  return { ok: true, jumlah: c };
}
