
// Image Slider
function setupImageSlider() {
  const slides = document.querySelectorAll('.headerslide');
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Testimonials Rotation
function setupTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;

  function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      testimonials[index].classList.add('active');
  }

  function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }

  // Change testimonial every 7 seconds
  setInterval(nextTestimonial, 7000);
}

// Smooth Scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
}

// Initialize all features when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupImageSlider();
  setupTestimonials();
  setupSmoothScroll();
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Basic form validation
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const organization = document.getElementById('organization').value;
          const service = document.getElementById('service').value;
          const timeline = document.getElementById('timeline').value;
          const budget = document.getElementById('budget').value;
          const message = document.getElementById('message').value;
          
          if (!name || !email || !service || !message) {
              alert('Please fill in all required fields.');
              return;
          }
          
           // Create the data object to send
           const formData = {
            name: name,
            email: email,
            phone: phone,
            organization: organization,
            service: service,
            timeline: timeline,
            budget: budget,
            message: message
        };

        // Send data to the server using fetch API (or XMLHttpRequest)
        fetch('/your-server-endpoint', {  // Replace with your server endpoint
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
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        })
        .catch(error => {
            // Handle errors during fetch
            console.error('Error:', error);
            alert('An error occurred while sending your message. Please try again later.');
        });
        
        contactForm.reset();
      });
  }
});