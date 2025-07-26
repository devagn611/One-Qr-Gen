import { JSDOM } from "jsdom";
import { styleQrCode } from "../addon/styleQrCode.js";
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

export default  async function createUrlCode(req, res) {
    const { url, ...options } = req.query;

    if (!url) {
        return res.status(400).send({ message: "URL is required" });
    }

    try {
       console.log("Generating QR for URL:", url);
       
       const finalQr = await styleQrCode(url, options);
       
       res.setHeader("Content-Type", "image/svg+xml");
       res.send(finalQr);
       console.log("URL QR code created successfully");
     } catch (error) {
       console.error("Error generating URL QR code:", error);
       res.status(500).send({ message: "Error generating QR code", error: error.message });
     }
   }
   