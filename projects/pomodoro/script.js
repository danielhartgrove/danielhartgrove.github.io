const timer = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60, // Time in seconds
  timerLabel: "Session",
  running: false,
  intervalId: null,
  beep: document.getElementById("beep"),
  progressBg: document.querySelector('.progress-background'),
  initialTime: 25 * 60, // Store initial time for progress calculation
  
  updateProgress: function() {
      const progress = (this.timeLeft / this.initialTime) * 100;
      const translateX = 100 - progress; // Inverse the progress for left-to-right movement
      this.progressBg.style.transform = `translateX(${translateX}%)`;
  },
  updateDisplay: function() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      document.getElementById("time-left").textContent = formattedTime;
      this.updateProgress();
  },
  startStop: function(reset) {
    if(reset){
      this.running = !this.running;
    }
    document.getElementById("start_stop").textContent = this.running ? "Pause" : "Start";
    if (this.running) {
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft < 0) {
                clearInterval(this.intervalId);
                this.beep.play();
                if (this.timerLabel === "Session") {
                    this.timerLabel = "Break";
                    this.timeLeft = this.breakLength * 60;
                    this.initialTime = this.breakLength * 60;
                } else {
                    this.timerLabel = "Session";
                    this.timeLeft = this.sessionLength * 60;
                    this.initialTime = this.sessionLength * 60;
                }
                document.getElementById("timer-label").textContent = this.timerLabel;
                this.updateDisplay();
                this.startStop(false); // Auto-start the next timer
            }
        }, 1000);
    } else {
        clearInterval(this.intervalId);
    }
  },
  reset: function() {
      clearInterval(this.intervalId);
      this.running = false;
      document.getElementById("start_stop").textContent = "Start";
      this.breakLength = 5;
      this.sessionLength = 25;
      this.timeLeft = 25 * 60;
      this.initialTime = 25 * 60;
      this.timerLabel = "Session";
      document.getElementById("timer-label").textContent = this.timerLabel;
      this.updateDisplay();
      document.getElementById("break-length").textContent = this.breakLength;
      document.getElementById("session-length").textContent = this.sessionLength;
      this.beep.pause();
      this.beep.currentTime = 0;
      this.progressBg.style.transform = 'translateX(-100%)';
  },
  increment: function(type) {
      const length = type === "break" ? "breakLength" : "sessionLength";
      if (this[length] < 60) {
          this[length]++;
          document.getElementById(`${type}-length`).textContent = this[length];
          if (!this.running && type === "session") {
              this.timeLeft = this[length] * 60;
              this.initialTime = this[length] * 60;
              this.updateDisplay();
          }
      }
  },
  decrement: function(type) {
      const length = type === "break" ? "breakLength" : "sessionLength";
      if (this[length] > 1) {
          this[length]--;
          document.getElementById(`${type}-length`).textContent = this[length];
          if (!this.running && type === "session") {
              this.timeLeft = this[length] * 60;
              this.initialTime = this[length] * 60;
              this.updateDisplay();
          }
      }
  },
};
// Event listeners
document.getElementById("break-decrement").addEventListener("click", () => timer.decrement("break"));
document.getElementById("break-increment").addEventListener("click", () => timer.increment("break"));
document.getElementById("session-decrement").addEventListener("click", () => timer.decrement("session"));
document.getElementById("session-increment").addEventListener("click", () => timer.increment("session"));
document.getElementById("start_stop").addEventListener("click", () => timer.startStop(true));
document.getElementById("reset").addEventListener("click", () => timer.reset());
// Initial display update
timer.updateDisplay();