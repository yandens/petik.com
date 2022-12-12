const qr = require("qr-image");

const generateQRCode = (payload) => {
  try {
    const buffer = qr.imageSync(payload);
    return buffer;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = generateQRCode;
