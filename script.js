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


document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const closeSidebar = document.getElementById("close-sidebar");
  const modeToggle = document.getElementById("mode-toggle");

  // Buka sidebar
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  // Tutup sidebar
  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });

  // Toggle dark mode
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    modeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });
});

// kolom pencaharian
document.getElementById("searchInput").addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const desc = card.querySelector("p").textContent.toLowerCase();
      const visible = title.includes(keyword) || desc.includes(keyword);
      card.style.display = visible ? "block" : "none";
    });
  });
