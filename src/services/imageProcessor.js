const axios = require("axios");
const sharp = require("sharp");

async function processImage(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);

    const metadata = await sharp(imageBuffer).metadata();
    const perimeter = 2 * (metadata.height + metadata.width);

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 300 + 100)
    );

    return { url, perimeter };
  } catch (error) {
    throw new Error(`Failed to process image: ${url}`);
  }
}

module.exports = { processImage };
