const mongoose = require('mongoose');
const printHistorySchema = new mongoose.Schema({
    email: String,
    fileName: String,
    printerName: String,
    Location: String,
    pages: String,
    copies: Number,
    sides: String,
    paperType: String,
    collation: String,
    orientation: String,
    paperSize: String,
    datePrinting: String,
    Status: String,
});
module.exports = mongoose.model('printHistory', printHistorySchema,'printHistory');