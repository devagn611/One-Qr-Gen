import { styleQrCode } from "../addon/styleQrCode.js";
import { parseNestedQuery } from "../utils/queryParser.js";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

// ======================
// Server-side QR code generation
// ======================
export default async function qrGen(req, res) {
  try {
    const {
      name, 
      email, 
      phone,
      ...rawOptions
    } = req.query;

    // Validate required parameters
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        message: "All parameters 'name', 'email', and 'phone' are required",
        error: "Missing required parameters"
      });
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || phone.length > 20) {
      return res.status(400).json({ 
        message: "Invalid parameter lengths: name (max 100), email (max 255), phone (max 20)"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format"
      });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        message: "Invalid phone format"
      });
    }

    // Parse nested query parameters
    const options = parseNestedQuery(rawOptions);

    // Escape special characters in vCard data
    const escapeVCard = (str) => str.replace(/[;,\\]/g, '\\$&');
    
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${escapeVCard(name)}
EMAIL:${escapeVCard(email)}
TEL:${escapeVCard(phone)}
END:VCARD`;

    const finalQr = await styleQrCode(vCardData, options);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(finalQr);
  } catch (error) {
    console.error("Error generating vCard QR code:", error);
    res.status(500).json({ 
      message: "Error generating QR code", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// ======================
// Client-side QR code & UI functions
// (Intended to run in a browser environment)
// ======================

// If not defined elsewhere, simple stubs for loader functions:
export function showLoader() {
  console.log("Loader shown");
}

export function hideLoader() {
  console.log("Loader hidden");
}

export function showInputFields(dataType) {
    
  const inputGroups = document.getElementsByClassName("input-group");
  for (let i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.display = "none";
  }
  if (dataType !== "") {
    const groupEl = document.getElementById(dataType + "Group");
    if (groupEl) {
      groupEl.style.display = "block";
    }
  }
}

export function generateQRCode(dataType) {
  const qrCodeElement = document.getElementById("qrCode");
  if (!qrCodeElement) return;
  qrCodeElement.innerHTML = ""; 

  if (dataType === "custom") {
    generateUPIQRCode();
  } else if (dataType === "url") {
    generateUPIIDQRCode();
  }
}

export function generateUPIIDQRCode(urldata) {
  const outputLink = urldata;
  generateQRCodeFromData(outputLink);
  const printQRBtn = document.getElementById("printQRBtn");
  const downloadQRBtn = document.getElementById("downloadQRBtn");
  if (printQRBtn) printQRBtn.style.display = "block";
  if (downloadQRBtn) downloadQRBtn.style.display = "block";
}

export function generateUPIQRCode(data) {
  const outputLink = data;
  generateQRCodeFromData(outputLink);
  const printQRBtn = document.getElementById("printQRBtn");
  const downloadQRBtn = document.getElementById("downloadQRBtn");
  if (printQRBtn) printQRBtn.style.display = "block";
  if (downloadQRBtn) downloadQRBtn.style.display = "block";
  const upiLinkEl = document.getElementById("upilinkapp");
  // Assumes 'upiLink' is defined in the global scope if needed
  if (upiLinkEl && typeof upiLink !== "undefined") {
    upiLinkEl.setAttribute("href", upiLink);
  }
}

export function generateQRCodeFromData(data) {
  showLoader();
  // Assume a client-side QRCode library is available as a global variable "qrcode"
  if (window.qrcode) {
    window.qrcode.clear();
  }
  window.qrcode = new QRCode(document.getElementById("qrCode"), {
    width: 200,
    height: 200,
  });
  window.qrcode.makeCode(data);
  hideLoader();
}

export function downloadQRCode(dataType, name, id) {
  const printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  let selectedName = (dataType === "upiid" || dataType === "upi") ? name : "Unknown";

  const nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;
  const wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";
  document.body.appendChild(wrapperElement);
  html2canvas(wrapperElement).then(function(canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    link.click();
    location.reload();
  });
}

export function printQRCode(dataType, name, id) {
  const printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  let selectedName = (dataType === "upiid" || dataType === "upi") ? name : "Unknown";

  const nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;
  const wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";
  document.body.innerHTML = "";
  document.body.appendChild(wrapperElement);
  window.print();
  location.reload();
}
