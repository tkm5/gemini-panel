# Gemini Panel

A Chrome extension that provides quick access to Google Gemini from any webpage via a side panel.

## Features

- **Side Panel Integration**: Access Gemini directly in Chrome's side panel without leaving your current page
- **Quick Text Selection**: Select text on any webpage and press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux) to send it to Gemini
- **Seamless Experience**: Gemini is embedded directly in the side panel for a smooth workflow

## Installation

### From Source

1. Clone this repository:

   ```bash
   git clone https://github.com/tkm5/gemini-panel.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `gemini-panel` folder

## Usage

### Opening the Side Panel

- Click the extension icon in Chrome's toolbar to open the Gemini side panel

### Quick Text Selection (Cmd+L / Ctrl+L)

1. Select any text on a webpage
2. Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)
3. The side panel will open and the selected text will be automatically inserted into Gemini's input field

## Files

```
gemini-panel/
├── manifest.json        # Extension configuration
├── config.js            # URL and domain configuration
├── background.js        # Service worker for extension events
├── content.js           # Keyboard shortcut detection
├── gemini-inject.js     # Injects selected text into Gemini
├── sidepanel.html       # Side panel UI
├── sidepanel.css        # Side panel styles
├── sidepanel.js         # Side panel logic
├── rules.json           # Network request rules
└── icons/
    └── Google Icon.png  # Extension icon
```

## Permissions

- `sidePanel`: Required for side panel functionality
- `storage`: Required to pass selected text between scripts
- `declarativeNetRequest`: Required to enable Gemini embedding in iframe
- `host_permissions` for `gemini.google.com`: Required to interact with Gemini

## Requirements

- Google Chrome (version 114 or later recommended for Side Panel API)
- A Google account to use Gemini
