const mongoose = require('mongoose');
const printerSchema = new mongoose.Schema({
    id: Number,
    Name: String,
    Location: String,
    status: String,
    remaining_page: Number  
});
module.exports = mongoose.model('printerass', printerSchema,'printer');