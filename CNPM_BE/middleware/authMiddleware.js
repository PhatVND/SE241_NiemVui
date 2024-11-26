// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
    req.user = { userId: decoded.id, role: decoded.role }; // Lưu thông tin user từ token vào req
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is expired or not valid' });
  }
}

// Tạo access token
function generateAccessToken(userId, role) {
  let payload = { id: userId, role: role };

  return jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {
    expiresIn: process.env.EXPIRE_ACCESS,
  });
}

// Tạo refresh token
function generateRefreshToken(userId, role) {
  let payload = { id: userId, role: role };
  return jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
    expiresIn: process.env.EXPIRE_REFRESH,
  });
}

module.exports = { authMiddleware, generateAccessToken, generateRefreshToken };