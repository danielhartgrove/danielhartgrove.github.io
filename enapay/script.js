// Image Slider
function setupImageSlider() {
  const slides = document.querySelectorAll('.headerslide');
  if(slides.length === 0){
    return;
  }
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
  if(testimonials.length === 0){
    return;
  }
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

