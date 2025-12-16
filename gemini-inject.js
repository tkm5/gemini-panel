// Gemini Inject Script - Inserts selected text into Gemini's input field

(function() {
  // Function to insert text into the input field
  const insertTextToInput = (text) => {
    // Find the input area
    const inputSelectors = [
      'div[contenteditable="true"]',
      'textarea',
      '.ql-editor',
      '[data-placeholder]'
    ];

    let inputField = null;
    for (const selector of inputSelectors) {
      inputField = document.querySelector(selector);
      if (inputField) break;
    }

    if (inputField) {
      // Insert text
      if (inputField.tagName === "TEXTAREA") {
        inputField.value = text;
        inputField.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        // For contenteditable divs
        inputField.textContent = text;
        inputField.dispatchEvent(new Event("input", { bubbles: true }));

        // Move cursor to end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(inputField);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      // Clear the stored text after inserting
      chrome.storage.local.remove("selectedText");

      // Focus the input
      inputField.focus();
      return true;
    }
    return false;
  };

  // Retry inserting text with delay
  const insertTextWithRetry = (text, retryCount = 0) => {
    if (!insertTextToInput(text) && retryCount < 10) {
      setTimeout(() => insertTextWithRetry(text, retryCount + 1), 500);
    }
  };

  // Check for selected text in storage on page load
  chrome.storage.local.get(["selectedText"], (result) => {
    if (result.selectedText) {
      // Start trying to insert after DOM is ready
      if (document.readyState === "complete") {
        setTimeout(() => insertTextWithRetry(result.selectedText), 1000);
      } else {
        window.addEventListener("load", () => setTimeout(() => insertTextWithRetry(result.selectedText), 1000));
      }
    }
  });

  // Listen for storage changes to handle new text while chat is already open
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.selectedText && changes.selectedText.newValue) {
      // Insert text into existing chat input
      insertTextWithRetry(changes.selectedText.newValue);
    }
  });
})();
