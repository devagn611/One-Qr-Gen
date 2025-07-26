
import QRCodeStyling from "qr-code-styling";
import { optimize } from "svgo";


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
  const {
    minify = true,
    errorCorrectionLevel = 'M',
    width = 300,
    height = 300,
    ...rest
  } = options;

  const qrOptions = {
    width,
    height,
    type: "svg",
    data,
    qrOptions: {
      errorCorrectionLevel,
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
    ...rest,
  };

  // Deep merge for nested options
  if (rest.dotsOptions) {
    qrOptions.dotsOptions = { ...qrOptions.dotsOptions, ...rest.dotsOptions };
  }
  if (rest.backgroundOptions) {
    qrOptions.backgroundOptions = { ...qrOptions.backgroundOptions, ...rest.backgroundOptions };
  }
  if (rest.imageOptions) {
    qrOptions.imageOptions = { ...qrOptions.imageOptions, ...rest.imageOptions };
  }
  if (rest.cornersSquareOptions) {
    qrOptions.cornersSquareOptions = { ...qrOptions.cornersSquareOptions, ...rest.cornersSquareOptions };
  }
  if (rest.cornersDotOptions) {
    qrOptions.cornersDotOptions = { ...qrOptions.cornersDotOptions, ...rest.cornersDotOptions };
  }


  const qrCode = new QRCodeStyling(qrOptions);

  const container = document.createElement("div");
  document.body.appendChild(container);
  qrCode.append(container);

  const rawData = await qrCode.getRawData("svg");
  let svgString;
  if (rawData instanceof Blob) {
    const buffer = Buffer.from(await rawData.arrayBuffer());
    svgString = buffer.toString("utf-8");
  } else {
    svgString = rawData;
  }

  if (minify && typeof svgString === "string") {
    try {
      const result = optimize(svgString, { multipass: true });
      if (result.data) return result.data;
    } catch (e) {
      return svgString;
    }
  }
  return svgString;
}
