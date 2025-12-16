// Gemini Inject Script - Inserts selected text into Gemini's input field

(function() {
  // Check for selected text in storage
  chrome.storage.local.get(["selectedText"], (result) => {
    if (result.selectedText) {
      // Wait for the input field to be available
      const insertText = () => {
        // Gemini uses a rich text editor, find the input area
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
            inputField.value = result.selectedText;
            inputField.dispatchEvent(new Event("input", { bubbles: true }));
          } else {
            // For contenteditable divs
            inputField.textContent = result.selectedText;
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
        } else {
          // Retry after a short delay if input not found
          setTimeout(insertText, 500);
        }
      };

      // Start trying to insert after DOM is ready
      if (document.readyState === "complete") {
        setTimeout(insertText, 1000);
      } else {
        window.addEventListener("load", () => setTimeout(insertText, 1000));
      }
    }
  });
})();
