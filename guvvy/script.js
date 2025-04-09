document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', (e) => {
    // Prevent external links from triggering the fullscreen
    if (e.target.tagName === 'A') return;

    // Remove fullscreen from any currently expanded item
    document.querySelectorAll('.item.fullscreen').forEach(fullItem => {
      if (fullItem !== item) {
        fullItem.classList.remove('fullscreen', 'expanded');
      }
    });

    // Toggle fullscreen mode on clicked item
    item.classList.toggle('fullscreen');
    item.classList.toggle('expanded');

    // Toggle the glass effect
    const glass = document.getElementById('glass');
    const body = document.body;
    if (item.classList.contains('fullscreen')) {
      glass.classList.remove('hidden');
      body.classList.add('stopscroll'); // Prevent body scroll
      setTimeout(() => {
        glass.style.opacity = 1; // Fade in the glass
      }, 25); // Small delay to allow transition to start
    } else {
      glass.style.opacity = 0; // Fade out the glass
      setTimeout(() => {
        glass.classList.add('hidden');
        body.classList.remove('stopscroll'); // Allow body scroll again
      }, 300); // Delay hiding after fade out
    }
  });
});
