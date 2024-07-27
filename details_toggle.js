const detailsElements = document.querySelectorAll('details');

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
