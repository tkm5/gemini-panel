/**
 * Configuration file for the extension
 *
 * To change the target service, update:
 * 1. BASE_URL and DOMAIN below
 * 2. manifest.json: host_permissions and content_scripts matches
 * 3. rules.json: urlFilter
 *
 * Examples:
 *   - Google Gemini: "https://gemini.google.com/app", "gemini.google.com"
 *   - Google AI Studio: "https://aistudio.google.com/prompts/new_chat", "aistudio.google.com"
 */
const CONFIG = {
  BASE_URL: "https://aistudio.google.com/prompts/new_chat",
  DOMAIN: "aistudio.google.com"
};
