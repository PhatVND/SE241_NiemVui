const express = require("express");
const multer = require("multer");
const printController = require("../controllers/printController");
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  // Tạo thư mục uploads nếu chưa tồn tại
  const fs = require("fs");
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

router.get("/",printController.index)
router.post("/", printController.uploadPdf, printController.handleUpload);
router.post("/addHistory",printController.addHistory)
module.exports =router                         