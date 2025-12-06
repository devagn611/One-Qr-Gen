import { styleQrCode } from "../addon/styleQrCode.js";
import { parseNestedQuery } from "../utils/queryParser.js";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

export default async function createUpiCode(req, res) {
  try {
    const { upiid, name, ...rawOptions } = req.query;

    // Validate required parameters
    if (!upiid || !name) {
      return res.status(400).json({ 
        message: "Both 'upiid' and 'name' are required",
        error: "Missing required parameters"
      });
    }

    // Validate input length
    if (upiid.length > 100 || name.length > 100) {
      return res.status(400).json({ 
        message: "UPI ID and name must be less than 100 characters each"
      });
    }

    // Parse nested query parameters
    const options = parseNestedQuery(rawOptions);

    const upiIdstring = `upi://pay?pa=${encodeURIComponent(upiid)}&pn=${encodeURIComponent(name)}`;
    
    const finalQr = await styleQrCode(upiIdstring, options);
    
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(finalQr);
  } catch (error) {
    console.error("Error generating UPI QR code:", error);
    res.status(500).json({ 
      message: "Error generating QR code", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
