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

    const checkbox = document.getElementById('checkbox'); // Replace with your checkbox's ID
    if (checkbox.checked) {
        allElements.forEach(element => {
            element.classList.add('-day');
            element.classList.remove('-night');
        });
    }
    else{
        allElements.forEach(element => {
            element.classList.add('-night');
            element.classList.remove('-day');
        });
    }

  });