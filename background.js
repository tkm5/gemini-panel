// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SELECTED_TEXT") {
    // Store the selected text
    chrome.storage.local.set({ selectedText: message.text });

    // Open side panel
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
  }
});
