const Printer = require('../models/print');
const PageSize = require('../models/pageSize');
const PrintHistory = require('../models/printHistory')
const userHasBalance = require('../models/userHasBalance.js')
module.exports.index = async(req,res) => {
  const printers = await Printer.find({status: 'On'});
  const page = await PageSize.find();
  const userBalance = await userHasBalance.findOne({username : "LangTuDaTinh"})
  const uploadStatus = "Chưa tải tệp:";
    res.render("printer/print_setting2",{ 
      printer: printers,
      pageSize: page,
      name: " ",
      balance: userBalance.balance,
      uploadStatus: uploadStatus
    }
     )
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

exports.renderHome = async(req, res) => {
  const printers = await Printer.find({status: 'On'});
  const page = await PageSize.find();
  const uploadStatus = "Chưa tải tệp:";
  const userBalance = await userHasBalance.findOne({username : "LangTuDaTinh"})
  res.render("printer/print_setting2", { 
    pdfUrl: null,
    printer: printers,
    pageSize: page,
    name: " ",
    balance: userBalance.balance,
    uploadStatus: uploadStatus
   });
};

exports.handleUpload = async(req, res) => {
  const printers = await Printer.find({status: 'On'});
  const page = await PageSize.find();
  const userBalance = await userHasBalance.findOne({username : "LangTuDaTinh"})
  if (!req.file) {
    const uploadStatus = "Chưa tải tệp:";
    res.render("printer/print_setting2",{
      printer: printers,
      pageSize: page,
      name: " ",
      balance: userBalance.balance,
      uploadStatus: uploadStatus
    });
  }
  const pdfUrl = `/uploads/${req.file.filename}`;
  const filename = req.file.filename;
  const uploadStatus = "Đã tải tệp:";
  res.render("printer/print_setting2", { 
    pdfUrl,
    printer: printers,
    pageSize: page,
    name: filename,
    balance: userBalance.balance,
    uploadStatus: uploadStatus
   });
};
exports.addHistory = async(req, res) => {
  const pageToPrint = parseInt(req.body.copies);
  const userBalance = await userHasBalance.findOne({username : "LangTuDaTinh"})
  if(pageToPrint>20) return res.status(500);
  const printer = await Printer.findOne({id:parseInt(req.body.printer)})
   console.log(req.body.printer);
  // const printerName = printer.Name;
  const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
let hh = today.getHours(); // Get hours
let min = today.getMinutes(); // Get minutes
let ss = today.getSeconds(); // Get seconds

// Format day and month with leading zero if needed
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

// Format time with leading zero if needed
if (hh < 10) hh = '0' + hh;
if (min < 10) min = '0' + min;
if (ss < 10) ss = '0' + ss;

// Combine the date and time
const formattedToday = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;


  const newBalance = userBalance.balance - req.body.totalMoney;
  await userBalance.updateOne({balance: newBalance});
  const newHistory = new PrintHistory({
    email: userBalance.email,
    fileName:req.body.filename,
    printerName: printer.Name,
    Location: printer.Location,
    pages: req.body.pages,
    oddOrEven: req.body.oddOrEven,
    copies: parseInt(req.body.copies),
    sides: req.body.duplex,
    paperType: req.body.paperType,
    collation: req.body.collation,
    orientation: req.body.orientation,
    paperSize: req.body.paperSize,
    totalMoney: req.body.totalMoney,
    datePrinting: formattedToday,
    Status: "Đang xử lí",
  })
  await newHistory.save()
  res.redirect('/print/')
}
