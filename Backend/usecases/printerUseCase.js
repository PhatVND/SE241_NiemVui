const PrinterRepository = require('../repositories/printerRepository'); 

class PrinterUseCase {
  async addPrinter(name, location, status) {
    const existingPrinter = await PrinterRepository.findByName(name);
    if (existingPrinter) {
      throw new Error('Printer already exists');
    }
    const newPrinter = await PrinterRepository.create({ name, location, status });
    return newPrinter;
  }

  async deletePrinterByName(name) {
    const printer = await PrinterRepository.findByName(name);
    if (!printer) {
      throw new Error('Printer not found');
    }
    const result = await PrinterRepository.deleteByName(name);
    return result;
  }
}


module.exports = new PrinterUseCase();
