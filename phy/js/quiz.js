/* =========================================================
   FISIKA QUEST — quiz.js
   Mesin kuis yang dipakai ulang di semua stage:
   1) renderMathWarmup — pemanasan matematika + tombol Petunjuk
   2) renderPractice    — latihan konsep (pilihan ganda, boleh coba ulang)
   3) renderBoss        — pertempuran bos (soal berjenjang / scaffolded)
   ========================================================= */

const FQ_Quiz = (function(){

  function esc(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

  /* ---------------------------------------------------------
     1) MATH WARMUP — tiap soal punya tombol "Tampilkan Petunjuk"
  --------------------------------------------------------- */
  function renderMathWarmup(container, items, opts){
    opts = opts || {};
    let correctCount = 0;
    let answered = new Array(items.length).fill(false);

    container.innerHTML = items.map((it,i)=>`
      <div class="q-block" data-idx="${i}">
        <div class="q-progress">SOAL ${i+1} / ${items.length}</div>
        <div class="q-text">${it.q}</div>
        ${it.type==='fill' ? `
          <div class="q-fill">
            <input type="text" inputmode="decimal" placeholder="jawaban" data-fill="${i}">
            <button class="pixel-btn cyan" data-check="${i}" style="font-size:.6rem;">Cek</button>
          </div>
        ` : `
          <div class="q-options" data-opts="${i}">
            ${it.options.map((op,j)=>`<button class="q-opt" data-mc="${i}" data-j="${j}">${op}</button>`).join('')}
          </div>
        `}
        ${it.hint ? `<button class="hint-btn" data-hint="${i}">💡 Tampilkan Petunjuk</button>
          <div class="q-feedback" data-hintbox="${i}" style="display:none;"></div>` : ''}
        <div class="q-feedback" data-fb="${i}"></div>
      </div>
    `).join('');

    container.querySelectorAll('[data-hint]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const i = btn.dataset.hint;
        const box = container.querySelector(`[data-hintbox="${i}"]`);
        box.style.display='block';
        box.className = 'q-feedback show';
        box.innerHTML = '💡 ' + items[i].hint;
        FQ.sfx.click();
      });
    });

    function markDone(i, ok){
      if(answered[i]) return;
      answered[i] = true;
      if(ok) correctCount++;
      if(answered.every(Boolean) && opts.onDone) opts.onDone(correctCount, items.length);
    }

    container.querySelectorAll('[data-mc]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const i = +btn.dataset.mc, j = +btn.dataset.j;
        const it = items[i];
        const ok = j === it.answer;
        container.querySelectorAll(`[data-mc="${i}"]`).forEach(b=>{
          b.disabled = true;
          if(+b.dataset.j === it.answer) b.classList.add('correct');
        });
        if(!ok) btn.classList.add('wrong');
        const fb = container.querySelector(`[data-fb="${i}"]`);
        fb.classList.add('show', ok?'ok':'bad');
        fb.innerHTML = (ok? '✅ Benar! ' : '❌ Belum tepat. ') + (it.explain||'');
        FQ.sfx[ok?'correct':'wrong']();
        markDone(i, ok);
      });
    });

    container.querySelectorAll('[data-check]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const i = +btn.dataset.check;
        const it = items[i];
        const input = container.querySelector(`[data-fill="${i}"]`);
        const val = (input.value||'').trim().replace(',','.');
        const ok = it.accept ? it.accept(val) : (Math.abs(parseFloat(val) - it.answer) < (it.tol||0.01));
        const fb = container.querySelector(`[data-fb="${i}"]`);
        fb.classList.add('show', ok?'ok':'bad');
        fb.innerHTML = (ok? '✅ Benar! ' : '❌ Coba lagi / lihat petunjuk. ') + (ok? (it.explain||''): '');
        input.style.borderColor = ok? 'var(--success)' : 'var(--danger)';
        FQ.sfx[ok?'correct':'wrong']();
        if(ok) markDone(i, true);
      });
    });
  }

  /* ---------------------------------------------------------
     2) PRACTICE — pilihan ganda biasa, boleh dicoba ulang
  --------------------------------------------------------- */
  function renderPractice(container, items, opts){
    opts = opts || {};
    let firstTryCorrect = 0;
    let locked = new Array(items.length).fill(false);

    container.innerHTML = items.map((it,i)=>`
      <div class="q-block" data-idx="${i}">
        <div class="q-progress">SOAL ${i+1} / ${items.length}</div>
        <div class="q-text">${it.q}</div>
        <div class="q-options">
          ${it.options.map((op,j)=>`<button class="q-opt" data-mc="${i}" data-j="${j}">${op}</button>`).join('')}
        </div>
        <div class="q-feedback" data-fb="${i}"></div>
      </div>
    `).join('');

    let attempted = new Array(items.length).fill(false);

    container.querySelectorAll('[data-mc]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const i = +btn.dataset.mc, j = +btn.dataset.j;
        if(locked[i]) return;
        const it = items[i];
        const ok = j === it.answer;
        const fb = container.querySelector(`[data-fb="${i}"]`);
        if(ok){
          locked[i] = true;
          if(!attempted[i]) firstTryCorrect++;
          container.querySelectorAll(`[data-mc="${i}"]`).forEach(b=>{ b.disabled=true; if(+b.dataset.j===it.answer) b.classList.add('correct'); });
          fb.classList.add('show','ok');
          fb.innerHTML = '✅ Tepat! ' + (it.explain||'');
          FQ.sfx.correct();
        } else {
          attempted[i] = true;
          btn.classList.add('wrong');
          btn.disabled = true;
          fb.classList.add('show','bad');
          fb.innerHTML = '❌ Coba pilihan lain.';
          FQ.sfx.wrong();
        }
        if(container.querySelectorAll('.q-block').length){
          const allLocked = locked.every(Boolean);
          if(allLocked && opts.onDone) opts.onDone(firstTryCorrect, items.length);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     3) BOSS BATTLE — soal berjenjang (scaffolded), HP mechanic
  --------------------------------------------------------- */
  function renderBoss(container, subquestions, opts){
    opts = opts || {};
    const bossName = opts.bossName || 'Penjaga';
    const bossEmoji = opts.bossEmoji || '👾';
    let bossHP = 100, playerHP = 100;
    let idx = 0;
    let finished = false;

    function shell(){
      return `
        <div class="arena">
          <div class="weight-tag">${bossName}</div>
          <div class="boss-sprite" id="bossSprite">${bossEmoji}</div>
          <div class="hpbar-wrap">
            <div class="hpbar-label"><span>${bossName}</span><span id="bossHpTxt">${bossHP}%</span></div>
            <div class="hpbar boss"><span id="bossHpBar" style="width:${bossHP}%"></span></div>
          </div>
          <div class="hpbar-wrap">
            <div class="hpbar-label"><span>HP Kamu</span><span id="playerHpTxt">${playerHP}%</span></div>
            <div class="hpbar player"><span id="playerHpBar" style="width:${playerHP}%"></span></div>
          </div>
        </div>
        <div id="bossQArea"></div>
        <div id="bossResult"></div>
      `;
    }
    container.innerHTML = shell();

    function updateBars(){
      container.querySelector('#bossHpBar').style.width = Math.max(bossHP,0)+'%';
      container.querySelector('#bossHpTxt').textContent = Math.max(bossHP,0)+'%';
      container.querySelector('#playerHpBar').style.width = Math.max(playerHP,0)+'%';
      container.querySelector('#playerHpTxt').textContent = Math.max(playerHP,0)+'%';
    }

    function renderQ(){
      if(finished) return;
      const qArea = container.querySelector('#bossQArea');
      const it = subquestions[idx];
      qArea.innerHTML = `
        <div class="q-block">
          <div class="q-progress">TAHAP ${idx+1} / ${subquestions.length} &nbsp;·&nbsp; <span class="weight-tag">bobot ${it.weight}%</span></div>
          <div class="q-text">${it.q}</div>
          <div class="q-options">
            ${it.options.map((op,j)=>`<button class="q-opt" data-j="${j}">${op}</button>`).join('')}
          </div>
          <div class="q-feedback" data-fb="1"></div>
        </div>
      `;
      qArea.querySelectorAll('[data-j]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const j = +btn.dataset.j;
          const ok = j === it.answer;
          const fb = qArea.querySelector('[data-fb="1"]');
          if(ok){
            bossHP -= it.weight;
            FQ.sfx.hit();
            const spr = container.querySelector('#bossSprite');
            spr.classList.add('hit'); setTimeout(()=>spr.classList.remove('hit'),300);
            updateBars();
            fb.classList.add('show','ok');
            fb.innerHTML = '⚡ Serangan berhasil! ' + (it.explain||'');
            qArea.querySelectorAll('[data-j]').forEach(b=>b.disabled=true);
            btn.classList.add('correct');
            setTimeout(()=>{
              if(bossHP<=0){ winSequence(); }
              else { idx++; renderQ(); }
            }, 900);
          } else {
            playerHP -= 25;
            FQ.sfx.wrong();
            updateBars();
            btn.classList.add('wrong');
            fb.classList.add('show','bad');
            fb.innerHTML = '💥 Kena serangan balik! Baca lagi soalnya, lalu coba jawaban lain.';
            if(playerHP<=0){ setTimeout(loseSequence, 700); }
          }
        });
      });
    }

    function winSequence(){
      finished = true;
      FQ.sfx.victory();
      FQ.confetti();
      container.querySelector('#bossQArea').innerHTML = '';
      container.querySelector('#bossResult').innerHTML = `
        <div class="result-banner win">
          <h3 style="color:var(--success);">🏆 MENANG!</h3>
          <p>${bossName} berhasil ditaklukkan. Kamu benar-benar memahami materi ini!</p>
        </div>`;
      if(opts.onWin) opts.onWin();
    }
    function loseSequence(){
      finished = true;
      FQ.sfx.defeat();
      container.querySelector('#bossQArea').innerHTML = '';
      container.querySelector('#bossResult').innerHTML = `
        <div class="result-banner lose">
          <h3 style="color:var(--danger);">HP Habis...</h3>
          <p>Tenang, ini bagian dari belajar. Buka lagi bagian <b>Materi</b>, lalu tantang ${bossName} sekali lagi!</p>
          <button class="pixel-btn magenta" id="retryBoss" style="margin-top:.8rem;">Coba Lagi</button>
        </div>`;
      container.querySelector('#retryBoss').addEventListener('click', ()=>{
        bossHP=100; playerHP=100; idx=0; finished=false;
        container.innerHTML = shell();
        container.querySelector('#bossResult').innerHTML='';
        renderQ();
      });
      if(opts.onLose) opts.onLose();
    }

    renderQ();
  }

  return { renderMathWarmup, renderPractice, renderBoss };
})();
