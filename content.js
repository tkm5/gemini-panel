// Gemini Panel - Content Script
// Detect Cmd+L (Mac) or Ctrl+L (Windows) with selected text

document.addEventListener("keydown", (e) => {
  // Check for Cmd+L (Mac) or Ctrl+L (Windows/Linux)
  const isCmdOrCtrl = e.metaKey || e.ctrlKey;
  const isL = e.key === "l" || e.key === "L";

  if (isCmdOrCtrl && isL) {
    const selectedText = window.getSelection().toString().trim();

    // Only proceed if text is selected
    if (selectedText) {
      e.preventDefault();

      // Send selected text to background script
      chrome.runtime.sendMessage({
        type: "SELECTED_TEXT",
        text: selectedText
      });
    }
  }
});
