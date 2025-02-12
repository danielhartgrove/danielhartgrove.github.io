const display = document.getElementById("display");
const drumPads = document.querySelectorAll('.drum-pad');
const background = document.getElementById("container");

function playAudio(key) {
    const audioId = key.toUpperCase();
    const audio = document.getElementById(audioId);
    const button = document.querySelector(`[data-key="${audioId}"]`);
    
    if (audio && button) {
        audio.currentTime = 0; // Reset audio to start
        audio.play();
        
        // Visual feedback
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);

        background.classList.add('active');
        setTimeout(() => background.classList.remove('active'), 100);
        
        // Display the key pressed
        display.textContent = `Playing: ${audioId}`;
        setTimeout(() => display.textContent = '', 1000);
    }
}

// Click handlers
drumPads.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        playAudio(key);
    });
});

// Keyboard handlers
document.addEventListener('keydown', (event) => {
    playAudio(event.key);
});

// Prevent spacebar from scrolling
window.addEventListener('keydown', function(e) {
    if(e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
    }
});