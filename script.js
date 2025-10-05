let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer = null;
let isRunning = false;

// Update display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  document.getElementById("display").innerText = ${h}:${m}:${s}.${ms};
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
  }
}

// Stop timer
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reset timer
function resetTimer() {
  clearInterval(timer);
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  isRunning = false;
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
}

// Record Lap
function recordLap() {
  if (isRunning) {
    const lapTime = document.getElementById("display").innerText;
    const li = document.createElement("li");
    li.innerText = Lap ${document.getElementById("laps").children.length + 1}: ${lapTime};
    document.getElementById("laps").appendChild(li);
  }
}

// 🌙 Light/Dark Mode Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Initialize display
updateDisplay();

// Event Listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);