import { styleQrCode } from "../addon/styleQrCode.js";
import { parseNestedQuery } from "../utils/queryParser.js";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

export default async function qrGen(req, res) {
  try {
    const { text, ...rawOptions } = req.query;

    if (!text) {
      return res.status(400).json({ 
        message: "Text is required",
        error: "Missing required parameter"
      });
    }

    if (text.length > 500) {
      return res.status(400).json({ 
        message: "Text cannot be longer than 500 characters"
      });
    }

    // Parse nested query parameters
    const options = parseNestedQuery(rawOptions);

    const finalQr = await styleQrCode(text, options);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(finalQr);
  } catch (error) {
    console.error("Error generating unique QR code:", error);
    res.status(500).json({ 
      message: "Error generating QR code", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
