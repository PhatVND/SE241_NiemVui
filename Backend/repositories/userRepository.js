const User = require('../models/users');
const mongoose = require('mongoose');

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

 getAllUsers = async () => {
    return await User.find({}, { email: 1, _id: 0 }); // Lấy danh sách email
  };

  async findById(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid ID format');
    }
    return await User.findById(userId);
  }

  async findByRefreshToken(refreshToken) {
    return await User.findOne({ refreshToken });
  }

  async deleteByEmail(email) {
    await User.deleteOne({email})
  }
}


module.exports = new UserRepository();
