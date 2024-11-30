const printerUseCase = require('../usecases/printerUseCase');
const authUseCase = require('../usecases/authUseCase');
const adminUseCase = require('../usecases/adminUseCase');
const userRepository = require('../repositories/userRepository');

// [POST] admin/add/printer
module.exports.addPrinter = async (req, res, next) => {
  try {
    const { name, location, status } = req.body;
    await printerUseCase.addPrinter(name, location, status);
    res.status(201).json({ message: 'Printer added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

// [DELETE] admin/delete/printer
module.exports.deletePrinter = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Thiếu tên máy in' });
    }
    const result = await printerUseCase.deletePrinterByName(name);
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Máy in đã được xóa thành công' });
    } else {
      return res.status(404).json({ message: 'Không tìm thấy máy in để xóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, không thể xóa máy in' });
  }
};

// [POST] admin/add/user
module.exports.addUser = async (req, res) => {
  try {
    const { username, email, password, years, role } = req.body;
    await adminUseCase.addUser(username, email, password, years, role);
    res.status(200).json({ message: 'User added successfully', username });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports.logout = (req, res, next) => {
  res
    .clearCookie('refreshToken')
    .status(200)
    .json({ message: 'Logout successfully' });
};

// xoa user theo email
//[DELETE] admin/delete/user
module.exports.deleteUser = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await userRepository.findByEmail(email)
    await adminUseCase.deleteUser(email);
    res.status(200).json({ message: 'xoa thanh cong', data: user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server, không thể xóa người dùng' });
  }
};
