const iframe = document.getElementById("gemini-frame");
const fallback = document.getElementById("fallback");

// Set initial iframe src
iframe.src = CONFIG.BASE_URL;

// Check if iframe loaded successfully
iframe.addEventListener("load", () => {
  // If iframe is blocked, it will show a blank page or error
  // We can't detect X-Frame-Options errors directly, but we can check later
});

iframe.addEventListener("error", () => {
  showFallback();
});

function showFallback() {
  iframe.style.display = "none";
  fallback.classList.add("show");
}

// Open in new tab
document.getElementById("open-gemini").addEventListener("click", () => {
  chrome.tabs.create({ url: CONFIG.BASE_URL });
});

// Open in popup window
document.getElementById("open-gemini-window").addEventListener("click", () => {
  chrome.windows.create({
    url: CONFIG.BASE_URL,
    type: "popup",
    width: 500,
    height: 700
  });
});

// Note: Text insertion is now handled by gemini-inject.js
// which listens for storage changes and inserts text into the existing chat
