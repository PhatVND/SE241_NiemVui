const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, min: 5, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  years: {
    type: Number,
    min: [1, 'invalid years'],
    max: [4, 'invalid years'],
    required: true,
  },
  refreshToken: { type: String },
  role: { type: String, enum: ['ADMIN', 'USER'], required: true },
  balance: {type: Number, require: true}
});

// Hàm mã hóa mật khẩu trước khi lưu vào DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// So sánh mật khẩu đã mã hóa
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Tạo Model
const User = mongoose.model('userHasBalance', userSchema,'userHasBalance');
module.exports = User;
