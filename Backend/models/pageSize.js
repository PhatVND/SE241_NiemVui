const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
    id: Number,
    pageSize: String
});
module.exports = mongoose.model('page', pageSchema,'pageSize');