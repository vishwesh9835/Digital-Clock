// Get elements
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const toggleBtn = document.getElementById("toggle-btn");
const tickSound = document.getElementById("tick-sound");

// Sound control
let soundEnabled = true;

// Update clock every second
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display time
    timeEl.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Display date
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    dateEl.innerText = now.toLocaleDateString(undefined, options);

    // 🔊 Tick sound
    if (soundEnabled) {
        tickSound.currentTime = 0; // restart sound
        tickSound.play().catch(() => { });
    }
}

// Run clock
setInterval(updateClock, 1000);
updateClock();

// 🌙 Dark / Light mode toggle
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.innerText = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

// 🖱️ Double-click to toggle sound
document.addEventListener("dblclick", () => {
    soundEnabled = !soundEnabled;

    if (!soundEnabled) {
        tickSound.pause();
        tickSound.currentTime = 0;
    }
});

// 🔓 Unlock audio after first user interaction
document.addEventListener("click", () => {
    tickSound.play().catch(() => { });
}, { once: true });
