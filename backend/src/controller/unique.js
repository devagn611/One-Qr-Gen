import { styleQrCode } from "../addon/styleQrCode.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

export default async function qrGen(req, res) {
  const { text, ...options } = req.query;

  if (!text) {
    return res.status(400).send({ message: "Text is required" });
  }

  if (text.length > 500) {
    return res.status(400).send({ message: "Text cannot be longer than 500 characters" });
  }

  try {
    const finalQr = await styleQrCode(text, options);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(finalQr);
    console.log("Unique QR code created successfully");
  } catch (error) {
    console.error("Error generating unique QR code:", error);
    res.status(500).send({ message: "Error generating QR code", error: error.message });
  }
}
