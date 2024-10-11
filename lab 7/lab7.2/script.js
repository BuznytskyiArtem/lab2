// Array of sound files for each key
const sounds = {
  87: 'sounds/sound1.mp3', // W key
  65: 'sounds/sound2.mp3', // A key
  83: 'sounds/sound3.mp3', // S key
  68: 'sounds/sound4.mp3', // D key
  75: 'sounds/sound5.mp3', // K key
  76: 'sounds/sound6.mp3'  // L key
};

// Function to play sound
function playSound(keyCode) {
  const audio = new Audio(sounds[keyCode]);
  if (!audio) return; // If sound file not found, exit
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

// Function to add pressed class
function addPressedClass(key) {
  key.classList.add('pressed');
  setTimeout(() => key.classList.remove('pressed'), 200); // Remove class after 200ms
}

// Event handler for key press
function handleKeyPress(event) {
  const keyCode = event.keyCode;
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!key) return; // If no matching key element, exit
  playSound(keyCode);
  addPressedClass(key);
}

// Event handler for mouse click
function handleClick(event) {
  const keyCode = event.target.getAttribute('data-key');
  if (!keyCode) return; // If no data-key attribute, exit
  playSound(keyCode);
  addPressedClass(event.target);
}

// Adding event listeners
window.addEventListener('keydown', handleKeyPress);
document.querySelectorAll('.key').forEach(key => key.addEventListener('click', handleClick));
