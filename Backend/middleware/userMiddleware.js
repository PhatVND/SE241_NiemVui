function adminMiddleware(req, res, next) {
  if (req.user && req.user.role === 'USER') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: USER only' });
}

module.exports = adminMiddleware;
