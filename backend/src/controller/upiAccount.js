import { styleQrCode } from "../addon/styleQrCode.js";
import { parseNestedQuery } from "../utils/queryParser.js";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

export default async function createUpiCodeAccount(req, res) {
  try {
    const { acn, ifsc, name, ...rawOptions } = req.query;

    // Validate required parameters
    if (!acn || !ifsc || !name) {
      return res.status(400).json({ 
        message: "All parameters 'acn', 'ifsc', and 'name' are required",
        error: "Missing required parameters"
      });
    }

    // Validate input lengths
    if (acn.length > 20 || ifsc.length > 11 || name.length > 100) {
      return res.status(400).json({ 
        message: "Invalid parameter lengths: acn (max 20), ifsc (max 11), name (max 100)"
      });
    }

    // Validate IFSC format (11 characters, alphanumeric)
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.toUpperCase())) {
      return res.status(400).json({ 
        message: "Invalid IFSC format. Must be 11 characters (e.g., ABCD0123456)"
      });
    }

    // Parse nested query parameters
    const options = parseNestedQuery(rawOptions);

    // Build the UPI string.
    const upiACstring = `upi://pay?pa=${encodeURIComponent(acn)}@${encodeURIComponent(ifsc)}.ifsc.npci&pn=${encodeURIComponent(name)}&cu=INR`;
    
    // Generate the styled QR code SVG using the UPI string.
    const finalQr = await styleQrCode(upiACstring, options);
    
    // Set response headers for an SVG response.
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
