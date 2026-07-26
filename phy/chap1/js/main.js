/* =========================================================
   FISIKA QUEST — main.js
   Progress tracking, audio SFX (Web Audio, tanpa file suara),
   HUD, dan util bersama untuk seluruh halaman.
   ========================================================= */

const FQ = (function(){

  const STORE_KEY = 'fisikaquest_progress_v1';

  const STAGES = [
    { id:'stage1', num:1, title:'Desa Coulomb',     tag:'Muatan & Hukum Coulomb',  icon:'⚡', file:'stage1.html' },
    { id:'stage2', num:2, title:'Hutan Vektor',      tag:'Gaya 2D & Medan Listrik', icon:'🌲', file:'stage2.html' },
    { id:'stage3', num:3, title:'Gua Gauss',         tag:'Hukum Gauss',             icon:'🕳️', file:'stage3.html' },
    { id:'stage4', num:4, title:'Bukit Potensial',   tag:'Potensial & Energi',      icon:'⛰️', file:'stage4.html' },
    { id:'stage5', num:5, title:'Kastil Kapasitor',  tag:'Kapasitor & Rangkaian',   icon:'🏰', file:'stage5.html' },
    { id:'stage6', num:6, title:'Menara Akhir',      tag:'Kesimpulan & Ujian Akhir',icon:'🗼', file:'stage6.html' },
  ];

  function defaultProgress(){
    const p = {};
    STAGES.forEach(s=>{
      p[s.id] = { math:false, materi:false, latihan:{done:false, score:0}, boss:{done:false, stars:0} };
    });
    p.dojo = {};
    return p;
  }

  function loadProgress(){
    try{
      const raw = localStorage.getItem(STORE_KEY);
      if(!raw) return defaultProgress();
      const parsed = JSON.parse(raw);
      const def = defaultProgress();
      return Object.assign(def, parsed);
    }catch(e){ return defaultProgress(); }
  }

  function saveProgress(p){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(e){ /* ignore */ }
  }

  let progress = loadProgress();

  function get(){ return progress; }

  function set(stageId, part, value){
    if(!progress[stageId]) progress[stageId] = {};
    progress[stageId][part] = value;
    saveProgress(progress);
  }

  function isUnlocked(stageId){
    const idx = STAGES.findIndex(s=>s.id===stageId);
    if(idx<=0) return true;
    const prev = STAGES[idx-1];
    return !!(progress[prev.id] && progress[prev.id].boss && progress[prev.id].boss.done);
  }

  function stageStars(stageId){
    const p = progress[stageId];
    if(!p) return 0;
    let n = 0;
    if(p.math) n++;
    if(p.latihan && p.latihan.done) n++;
    if(p.boss && p.boss.done) n++;
    return n;
  }

  function totalStars(){
    return STAGES.reduce((a,s)=>a+stageStars(s.id),0);
  }

  function resetAll(){
    progress = defaultProgress();
    saveProgress(progress);
    location.reload();
  }

  /* ---------------- Audio (8-bit style, synthesized) ---------------- */
  let actx = null;
  function ctx(){
    if(!actx){
      try{ actx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ actx=null; }
    }
    return actx;
  }
  function beep(freq=440, dur=0.09, type='square', vol=0.05, delay=0){
    const c = ctx(); if(!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
    osc.connect(gain); gain.connect(c.destination);
    osc.start(t0); osc.stop(t0+dur+0.02);
  }
  const sfx = {
    click(){ beep(520,0.05,'square',0.04); },
    correct(){ beep(660,0.09,'square',0.05); beep(880,0.11,'square',0.05,0.09); },
    wrong(){ beep(180,0.18,'sawtooth',0.06); },
    hit(){ beep(120,0.08,'square',0.07); },
    unlock(){ [523,659,784,1047].forEach((f,i)=>beep(f,0.14,'triangle',0.06,i*0.11)); },
    victory(){ [523,523,523,659,784,1047].forEach((f,i)=>beep(f,0.16,'triangle',0.06,i*0.12)); },
    defeat(){ [400,350,300,220].forEach((f,i)=>beep(f,0.22,'sawtooth',0.05,i*0.15)); },
  };

  /* ---------------- Toast ---------------- */
  function toast(msg, ms=2200){
    let el = document.querySelector('.toast');
    if(!el){ el = document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(()=>el.classList.remove('show'), ms);
  }

  /* ---------------- HUD ---------------- */
  function renderHUD(mountSelector, opts){
    opts = opts || {};
    const mount = document.querySelector(mountSelector);
    if(!mount) return;
    const stars = totalStars();
    mount.innerHTML = `
      <div class="hud">
        <a href="${opts.homeHref||'index.html'}" class="brand"><span class="bolt">⚡</span> FISIKA QUEST <span class="small" style="font-family:var(--font-body); color:var(--parchment-dim); font-size:.65rem;">— Elektrostatika</span></a>
        <div class="hud-right">
          <span class="xp-pill">★ ${stars} / 18</span>
          ${opts.backHref? `<a href="${opts.backHref}" class="pixel-btn ghost" style="font-size:.55rem;">← Peta</a>`:''}
        </div>
      </div>`;
  }

  /* ---------------- confetti (canvas-free, DOM based) ---------------- */
  function confetti(){
    const colors = ['#f6b93b','#3be8e0','#ff5d8f','#7bd88f'];
    for(let i=0;i<28;i++){
      const el = document.createElement('div');
      const c = colors[i%colors.length];
      el.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:8px;height:8px;background:${c};z-index:5000;pointer-events:none;`;
      document.body.appendChild(el);
      const dur = 1800+Math.random()*1200;
      const rot = Math.random()*720;
      el.animate([
        { transform:`translateY(0) rotate(0deg)`, opacity:1 },
        { transform:`translateY(100vh) rotate(${rot}deg)`, opacity:0 }
      ], { duration:dur, easing:'ease-in' });
      setTimeout(()=>el.remove(), dur+50);
    }
  }

  return { STAGES, get, set, isUnlocked, stageStars, totalStars, resetAll, sfx, toast, renderHUD, confetti, saveProgress, loadProgress };
})();
