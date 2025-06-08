let timer;
let initialTime = 0* 0; 
let timeLeft = initialTime;
let alarmAudio;

window.addEventListener("DOMContentLoaded", () => {
  alarmAudio = document.getElementById('alarmAudio');
  updateDisplay(); 
});
/* set timer durasi dari yang d di input user*/
function setTime() {
  stopTimer(); 
  const minutes = document.getElementById('minutesInput').value;
  if (minutes && minutes > 0) {
    initialTime = minutes * 60;
    timeLeft = initialTime;
    updateDisplay();
  }
}

/*fungsi untuk memulai hitung mundur*/ 
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

/*fungsi untuk stop timer saat sudah berjalan*/
function stopTimer(){
   clearInterval(timer);
  timer = null;
  if (alarmAudio) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }
}

/* fungsi reset ke menit yang terakhir dimasukan*/
function resetTimer() {
  stopTimer();
  timeLeft = initialTime; 
  updateDisplay();
}

/*unruk update tampilan menit dan detik timer*/
function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}


