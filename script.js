let timer;
let initialTime = 0* 0; 
let timeLeft = initialTime;
let alarmAudio;

window.addEventListener("DOMContentLoaded", () => {
  alarmAudio = document.getElementById('alarmAudio');
  updateDisplay(); 
});

function setTime() {
  stopTimer(); 
  const minutes = document.getElementById('minutesInput').value;
  if (minutes && minutes > 0) {
    initialTime = minutes * 60;
    timeLeft = initialTime;
    updateDisplay();
  }
}


function startTimer() {
  if (timer) return; 

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      document.getElementById('timerDisplay').textContent = '00:00';
      if (alarmAudio) {
        alarmAudio.currentTime = 0;
        alarmAudio.play().catch(e => console.log("Failed to play audio:", e));
      }
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}


