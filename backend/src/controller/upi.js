import { JSDOM } from "jsdom";
import { styleQrCode } from "../addon/styleQrCode.js";
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;
export default  async function createUpiCode(req, res) {
    const {upiid, name, ...options} = req.query;

    try {
       const upiIdstring = `upi://pay?pa=${upiid}&pn=${name}`;
       console.log("Generated UPI string:", upiIdstring);
       
       const finalQr = await styleQrCode(upiIdstring, options);
       
       res.setHeader("Content-Type", "image/svg+xml");
       res.send(finalQr);
       console.log("UPI QR code created successfully");
     } catch (error) {
       console.error("Error generating UPI QR code:", error);
       res.status(500).send({ message: "Error generating QR code", error: error.message });
     }
   }
