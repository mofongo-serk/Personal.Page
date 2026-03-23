const filmRoll = document.getElementById("filmRoll");

const overlay = document.getElementById("overlay");
const bowButton = document.getElementById("bowButton");
const reveal = document.getElementById("reveal");

function openSite() {
  // Prevent double clicks
  bowButton.disabled = true;

  // Restart spin cleanly
  bowButton.classList.remove("spin");
  void bowButton.offsetWidth; // force reflow
  bowButton.classList.add("spin");

  // Wait for spin to finish (no timing mismatch ever)
  bowButton.addEventListener("animationend", () => {
    // Play curtain reveal
    reveal.classList.remove("play");
    void reveal.offsetWidth;
    reveal.classList.add("play");

    // Hide overlay
    overlay.classList.add("hidden");

    // Reveal content
    setTimeout(() => {
      document.body.classList.add("revealed");
    }, 500);
  }, { once: true });
}

bowButton.addEventListener("click", openSite);

// Keyboard support
window.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !overlay.classList.contains("hidden")) {
    e.preventDefault();
    openSite();
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();