function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    console.log(audio);
    audio.play();
  } else {
    console.error("ERROR: AUDIO NOT FOUND");
  }
}

// Get all buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const audioId = button.innerText;
    console.log(audioId);
    playAudio(audioId);
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase(); 
  const audioId = key;
  console.log(audioId);
  playAudio(audioId);
});