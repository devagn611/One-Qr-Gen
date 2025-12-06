import QRCodeStyling from "qr-code-styling";
import { optimize } from "svgo";
import { initializeDOM } from "../utils/domSetup.js";

// Ensure DOM is initialized
initializeDOM();

/**
 * Deep merge objects
 */
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Generate a highly customizable, optimized, and lightweight QR code SVG.
 * @param {string} data - The data to encode in the QR code.
 * @param {object} options - Customization options (see below).
 * Supported options:
 *   width, height, type, dotsOptions, backgroundOptions, imageOptions,
 *   cornersSquareOptions, cornersDotOptions, errorCorrectionLevel, margin, etc.
 *   minify (boolean): If true, minifies the SVG output.
 *   All qr-code-styling options are supported.
 */
export async function styleQrCode(data, options = {}) {
  if (!data || typeof data !== 'string') {
    throw new Error('Data must be a non-empty string');
  }

  const {
    minify = true,
    errorCorrectionLevel = 'M',
    width = 300,
    height = 300,
    ...rest
  } = options;

  // Default options
  const defaultOptions = {
    width: Number(width) || 300,
    height: Number(height) || 300,
    type: "svg",
    data,
    qrOptions: {
      errorCorrectionLevel: errorCorrectionLevel || 'M',
    },
    dotsOptions: {
      color: "#000000ff",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#ffffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
  };

  // Deep merge user options with defaults
  const qrOptions = deepMerge(defaultOptions, rest);

  // Ensure numeric values
  if (qrOptions.width) qrOptions.width = Number(qrOptions.width);
  if (qrOptions.height) qrOptions.height = Number(qrOptions.height);

  const qrCode = new QRCodeStyling(qrOptions);

  // Use a temporary container that we can clean up
  const container = document.createElement("div");
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);
  
  try {
    qrCode.append(container);

    const rawData = await qrCode.getRawData("svg");
    let svgString;
    
    if (rawData instanceof Blob) {
      const buffer = Buffer.from(await rawData.arrayBuffer());
      svgString = buffer.toString("utf-8");
    } else {
      svgString = rawData;
    }

    // Clean up container
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }

    if (minify && typeof svgString === "string") {
      try {
        const result = optimize(svgString, { 
          multipass: true,
          plugins: [
            'preset-default',
            { name: 'removeViewBox', active: false }
          ]
        });
        if (result.data) return result.data;
      } catch (e) {
        console.warn('SVG optimization failed:', e.message);
        return svgString;
      }
    }
    
    return svgString;
  } catch (error) {
    // Clean up on error
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    throw error;
  }
}
