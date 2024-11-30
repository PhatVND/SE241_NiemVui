const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Printer name is required'],
        unique: true,
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        enum: ['H6','H1','H2','H2','Nhà thi đấu'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    }
});

const Printer = mongoose.model('Printer', printerSchema);

module.exports = Printer;