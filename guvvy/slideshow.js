document.addEventListener("DOMContentLoaded", () => {
    const slideshows = document.querySelectorAll('.slideshow');
  
    slideshows.forEach(slideshow => {
      const imagePaths = slideshow.dataset.images.split(',');
      const display = slideshow.querySelector('.slideshow-display');
      let index = 0;
  
      const updateImage = () => {
        display.src = imagePaths[index];
      };
  
      const next = () => {
        index = (index + 1) % imagePaths.length;
        updateImage();
      };
  
      const prev = () => {
        index = (index - 1 + imagePaths.length) % imagePaths.length;
        updateImage();
      };
  
      slideshow.querySelector('.next').addEventListener('click', (e) => {
        e.stopPropagation();
        next();
      });
      
      slideshow.querySelector('.prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prev();
      });
      
      // Load the first image initially
      updateImage();
    });
  });
  