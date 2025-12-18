// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Handle keyboard shortcut command
chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command === "open-with-selection") {
    try {
      // Execute script to get selected text from the active tab
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString().trim()
      });

      const selectedText = results[0]?.result;

      if (selectedText) {
        // Store the selected text
        await chrome.storage.local.set({ selectedText: selectedText });
      }

      // Open side panel (this works because it's within user gesture context)
      chrome.sidePanel.open({ windowId: tab.windowId });
    } catch (error) {
      console.error("Error handling command:", error);
    }
  }
});

// Handle messages from content script (fallback for when panel is already open)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SELECTED_TEXT") {
    // Store the selected text
    chrome.storage.local.set({ selectedText: message.text });

    // Try to open side panel (may fail if not in user gesture context)
    chrome.sidePanel.open({ windowId: sender.tab.windowId }).catch(() => {
      // Panel might already be open or gesture context lost
    });
  }
});
