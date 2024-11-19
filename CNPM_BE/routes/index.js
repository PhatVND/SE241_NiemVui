const userRouter = require('./userRouter');
const authRoter = require('./authRouter');
const printRouter = require('./printRouter');

function route(app) {
  app.use('/login', authRoter);
  app.use('/user', userRouter);
  app.use('/print',printRouter);
}

module.exports = route;
