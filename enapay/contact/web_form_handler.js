// FORM ??

// Example email validation (improve regex as needed)
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Example client-side sanitization (basic - server-side is crucial)
function sanitizeInput(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = sanitizeInput(document.getElementById('name').value);
        const email = sanitizeInput(document.getElementById('email').value);
        const phone = sanitizeInput(document.getElementById('phone').value);
        const organization = sanitizeInput(document.getElementById('organisation').value);
        const service = sanitizeInput(document.getElementById('service').value);
        const timeline = sanitizeInput(document.getElementById('timeline').value);
        const budget = sanitizeInput(document.getElementById('budget').value);
        const message = sanitizeInput(document.getElementById('message').value);
        
        if(!isValidEmail(email)){
        alert('Email is not in valid email format. Please try again.');
        return;
        }

        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }
          
        // Create the data object to send
        const formData = {
            name: name,
            email: email,
            phone: phone,
            organisation: organization,
            service: service,
            timeline: timeline,
            budget: budget,
            message: message
        };

        fetch('ENDPOINT', {  // Replace with your server endpoint
            method: 'POST', // Or 'GET' if you prefer
            headers: {
                'Content-Type': 'application/json' // Important for JSON data
            },
            body: JSON.stringify(formData) // Convert data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Handle errors
            }
            return response.json(); // If your server sends back JSON, parse it
        })
        .then(data => {
            // Handle successful response from the server
            console.log('Success:', data); // Log the response (optional)
            alert('Thank you for your inquiry. We will get back to you soon!');
            contactForm.reset();
        })
        .catch(error => {
            // Handle errors during fetch
            console.error('Error:', error);
            alert('An error occurred whilst submitting your inquiry. Please try again later.');
        });
        
        contactForm.reset();
      });
  }
});