const userRouter = require('./userRouter');
const authRoter = require('./authRouter');
const printRouter = require('./printRouter');
const adminRouter = require('./adminRouter');
const { authMiddleware } = require('../middleware/authMiddleware');

function route(app) {
  app.use('/login', authRoter);
  app.use('/user', authMiddleware, userRouter);
  app.use('/admin', authMiddleware, adminRouter);
  app.use('/user', userRouter);
  app.use('/print', printRouter);
}

module.exports = route;
