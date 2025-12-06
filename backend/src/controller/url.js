import { styleQrCode } from "../addon/styleQrCode.js";
import { parseNestedQuery } from "../utils/queryParser.js";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

export default async function createUrlCode(req, res) {
  try {
    const { url, ...rawOptions } = req.query;

    if (!url) {
      return res.status(400).json({ 
        message: "URL is required",
        error: "Missing required parameter"
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ 
        message: "Invalid URL format",
        error: "URL must be a valid URL"
      });
    }

    // Validate URL length
    if (url.length > 2048) {
      return res.status(400).json({ 
        message: "URL must be less than 2048 characters"
      });
    }

    // Parse nested query parameters
    const options = parseNestedQuery(rawOptions);
    
    const finalQr = await styleQrCode(url, options);
    
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(finalQr);
  } catch (error) {
    console.error("Error generating URL QR code:", error);
    res.status(500).json({ 
      message: "Error generating QR code", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
   