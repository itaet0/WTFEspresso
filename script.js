document.addEventListener('DOMContentLoaded', () => {

  let clickCount = 0;
  let thoughts = [];
  const button = document.getElementById('espresso-shot');
  const thoughtBox = document.getElementById('thought-box');
  const logoWrapper = document.getElementById('logo-title-wrapper');

  // Load thoughts from GitHub
  fetch('https://raw.githubusercontent.com/itaet0/WTFEspresso/refs/heads/main/Thoughts.txt')
    .then(res => res.text())
    .then(data => {
      thoughts = data.split('\n').map(line => {
        const [level,text] = line.split('|');
        return {level:parseInt(level), text};
      });
      showRandomThought();
    })
    .catch(err => {
      thoughtBox.textContent = "Could not load thoughts :(";
      console.error(err);
    });

  // Show random thought based on click tier
  function showRandomThought() {
    const available = thoughts.filter(t => t.level <= clickCount || clickCount===0);
    if(!available.length) return;
    const random = available[Math.floor(Math.random()*available.length)];
    thoughtBox.textContent = random.text;
  }

  // Espresso Shot click
  button.addEventListener('click', ()=>{
    clickCount++;
    showRandomThought();

    button.classList.remove('jitter1','jitter2','jitter3','jitter4','chaosBounce');

    if(clickCount===1) button.classList.add('jitter1');
    else if(clickCount===2) button.classList.add('jitter2');
    else if(clickCount===3) button.classList.add('jitter3');
    else if(clickCount===4) button.classList.add('jitter4');
    else if(clickCount>=5){
      button.classList.add('chaosBounce');
      setTimeout(()=>{button.classList.remove('chaosBounce');},30000);
    }
  });

  // Clicking logo/title resets site
  logoWrapper.addEventListener('click', () => {
    clickCount = 0;
    button.classList.remove('jitter1','jitter2','jitter3','jitter4','chaosBounce');
    showRandomThought();
  });

});
