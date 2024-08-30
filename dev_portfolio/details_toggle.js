const detailsElements = document.querySelectorAll('details');
const toggleSwitch = document.querySelector('.switch');

detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
        if (details.open) {
        // Close all other open details elements
        detailsElements.forEach(otherDetails => {
            if (otherDetails !== details && otherDetails.open) {
                otherDetails.open = false;
            }
        });
        }
    });
});

toggleSwitch.addEventListener('click', () => {
    const allElements = document.querySelectorAll('.-day, .-night');
    const slider = document.getElementsByClassName('slider')[0];
    const checkbox = document.getElementById('checkbox');
  
    // Set the slider background color using a CSS variable
    slider.style.setProperty('--slider-background-color', checkbox.checked ? '#fc5' : '#fff');
  
    // Toggle the classes using classList.toggle()
    allElements.forEach(element => {
      element.classList.toggle('-day', checkbox.checked);
      element.classList.toggle('-night', !checkbox.checked);
    });
  });

window.onload = function() {
    slider.style.setProperty('--slider-background-color', '#fff');
};