/**
 * Initialize JSDOM once and reuse it for all requests
 * This significantly improves performance by avoiding repeated DOM creation
 */
import { JSDOM } from "jsdom";

let domInstance = null;
let isInitialized = false;

export function initializeDOM() {
  if (!isInitialized) {
    domInstance = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
      url: "http://localhost",
      referrer: "http://localhost",
      contentType: "text/html",
      includeNodeLocations: false,
      storageQuota: 10000000
    });
    
    global.window = domInstance.window;
    global.document = domInstance.window.document;
    // Note: navigator is read-only in Node.js, but qr-code-styling uses window.navigator
    // which is available through domInstance.window.navigator
    
    isInitialized = true;
  }
  
  return domInstance;
}

// Initialize on module load (synchronous initialization)
initializeDOM();

