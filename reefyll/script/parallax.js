const productBox = document.querySelector('.product_box'); 
const frontH2 = document.querySelector('.fronth2'); 
const backH2 = document.querySelector('.backh2');
const frontH3 = document.querySelector('.fronth3'); 
const fronta = document.querySelector('.fronta');

if (productBox && frontH2 && backH2 && frontH3) {
  document.addEventListener('scroll', function() {

    // Get document height
    const documentHeight = document.documentElement.scrollHeight;
    // Get window (viewport) height
    const windowHeight = window.innerHeight;
    // Calculate maximum scroll value (document height - viewport height)
    const maxScrollValue = documentHeight - windowHeight -100;

    // Get current scroll value
    let scrollValue = Math.min(window.scrollY, maxScrollValue); // Limit scrollValue to maxScrollValue

    // Calculate the maximum movement for the image (viewport height - image height)
    const imageMaxMovement = windowHeight - productBox.offsetHeight - 160;

    // Ensure scrollValue doesn't exceed imageMaxMovement
    const adjustedScrollValue = Math.min(scrollValue, imageMaxMovement);

    productBox.style.marginTop = `${(adjustedScrollValue * 4)}px`;
    frontH2.style.marginTop = `${adjustedScrollValue * -3}px`;
    backH2.style.marginTop = `${adjustedScrollValue * -3}px`;
    frontH3.style.marginTop = `${adjustedScrollValue * -2}px`; 
    fronta.style.marginTop = `${(adjustedScrollValue * -2)-160}px`;
  });
} else {
  console.error('Elements not found. Please check selectors.');
}
