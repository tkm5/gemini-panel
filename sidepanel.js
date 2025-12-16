const GEMINI_URL = "https://gemini.google.com/app";

const iframe = document.getElementById("gemini-frame");
const fallback = document.getElementById("fallback");

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

// Open Gemini in new tab
document.getElementById("open-gemini").addEventListener("click", () => {
  chrome.tabs.create({ url: GEMINI_URL });
});

// Open Gemini in popup window
document.getElementById("open-gemini-window").addEventListener("click", () => {
  chrome.windows.create({
    url: GEMINI_URL,
    type: "popup",
    width: 500,
    height: 700
  });
});

// Listen for storage changes to reload iframe when new text is selected
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.selectedText && changes.selectedText.newValue) {
    // Reload iframe to trigger gemini-inject.js
    iframe.src = GEMINI_URL;
  }
});

// Check for selected text on panel open
chrome.storage.local.get(["selectedText"], (result) => {
  if (result.selectedText) {
    // Reload iframe to trigger gemini-inject.js
    iframe.src = GEMINI_URL;
  }
});
