// middlewares/dynamicUpload.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function dynamicUpload(folderName = "") { 
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const baseDir = path.join(process.cwd(), "uploads", folderName);
        if (!fs.existsSync(baseDir)) {
          fs.mkdirSync(baseDir, { recursive: true });
        }
        cb(null, baseDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString("hex");
        cb(null, uniqueSuffix + path.extname(file.originalname));
      },
    }),
  });
}

module.exports = dynamicUpload;