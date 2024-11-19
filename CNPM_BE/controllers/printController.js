module.exports.index = async(req,res) => {
    res.render("printer/print_setting")
}
const path = require("path");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

exports.uploadPdf = upload.single("pdf");

exports.renderHome = (req, res) => {
  res.render("printer/print_setting", { pdfUrl: null });
};

exports.handleUpload = (req, res) => {
  if (!req.file) {
    res.render("printer/print_setting");
  }
  const pdfUrl = `/uploads/${req.file.filename}`;
  res.render("printer/print_setting", { pdfUrl });
};
