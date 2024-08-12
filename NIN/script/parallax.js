const top2   = document.querySelector('.top');
const left   = document.querySelector('.left');
const right  = document.querySelector('.right');
const bottom = document.querySelector('.bottom');

const alert = document.querySelector('.alert');

if (top && left && right && bottom) {
  const maxScrollValue = document.documentElement.scrollHeight - window.innerHeight;

  document.addEventListener('scroll', function() {
    let adjustedScrollValue = Math.min(window.scrollY, maxScrollValue);

    top2.style.marginTop   = `${adjustedScrollValue * -6}px`; 
    left.style.marginLeft  = `${adjustedScrollValue * -3}px`;
    right.style.marginLeft = `${adjustedScrollValue *  3}px`;
    bottom.style.marginTop = `${adjustedScrollValue *  6}px`;

    if(alert){
      if(window.scrollY < 26){
        alert.style.display = 'block';
      }else{
        alert.style.display = 'none';
      }
    }
  });
} else {
    console.error('Elements not found. Please check selectors.');
}