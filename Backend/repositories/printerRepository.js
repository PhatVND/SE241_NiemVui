const Printer = require('../models/printer');

class PrinterRepository {
    async findByName(name) {
      return await Printer.findOne({ name });
    }
    async create(data) {
      return await Printer.create(data);
    }
    async findAll() {
      return await Printer.find();
    }
    async deleteByName(name) {
      return await Printer.deleteOne({name});
    }
}
  
module.exports = new PrinterRepository();