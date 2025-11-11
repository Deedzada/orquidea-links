// Efeito de digitação
const phrases = [
  "Beleza natural em cada pétala...",
  "Flores que inspiram leveza...",
  "Orquídeas, arte viva."
];
let i = 0, j = 0, del = false, cur = [];
const el = document.getElementById("typing");

function type() {
  el.textContent = cur.join("");
  if (!del && j <= phrases[i].length) {
    cur.push(phrases[i][j]);
    j++;
  } else if (del && j > 0) {
    cur.pop();
    j--;
  }

  if (j === phrases[i].length) {
    del = true;
    setTimeout(type, 1500);
    return;
  } else if (del && j === 0) {
    del = false;
    i = (i + 1) % phrases.length;
  }
  setTimeout(type, del ? 60 : 100);
}

setTimeout(type, 1200);
/* ===== PETAL GENERATOR =====
   Gera N pétalas com propriedades aleatórias para movimento natural.
   Não precisa de imagens externas — usa SVG inline (pequeno) para qualidade.
*/
(function generatePetals(){
  const container = document.getElementById('petal-container');
  if(!container) return;

  // número de pétalas: 12 => 100% visual sem sobrecarregar (podes ajustar)
  const PETAL_COUNT = 12;

  // SVG de uma pétala simples (path leve)
  const petalSVG = (idClass='') => `
    <svg class="petal ${idClass}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2c-1.7 0-4 2-5 4s-1 4 1 6 4 2 6 1 4-3 4-5-2.3-6-6-6z"/>
    </svg>`.trim();

  // cria pétalas
  for(let i=0;i<PETAL_COUNT;i++){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = petalSVG( (i%3===0)?'large': (i%2===0)?'medium':'small' );
    const el = wrapper.firstElementChild;

    // propriedades aleatórias controladas
    const left = Math.random() * 100;                // posição horizontal em %
    const delay = (Math.random() * 8).toFixed(2) + 's';
    const dur = (10 + Math.random()*12).toFixed(2) + 's'; // 10s -> 22s
    const spin = (4 + Math.random()*8).toFixed(2) + 's';
    const drift = ((Math.random()*140)-70).toFixed(0) + 'px'; // drift left/right -70..+70px
    const sizeClass = i%3===0 ? 'large' : (i%2===0 ? 'medium' : 'small');

    el.classList.add(sizeClass);
    // estilo inline com variáveis para animação
    el.style.left = left + '%';
    el.style.top = (-5 - Math.random()*8) + '%'; // start slightly above the top
    el.style.setProperty('--delay', delay);
    el.style.setProperty('--duration', dur);
    el.style.setProperty('--spin', spin);
    el.style.setProperty('--drift', drift);

    container.appendChild(el);
  }

  // Limpeza eventual: regenerar se dimensões mudarem (evita duplicação)
  let width = window.innerWidth;
  window.addEventListener('resize', () => {
    if(Math.abs(window.innerWidth - width) > 120){
      width = window.innerWidth;
      // remove todas e regenera
      while(container.firstChild) container.removeChild(container.firstChild);
      generatePetals(); // recursivo controlado
    }
  });

})(); // IIFE
