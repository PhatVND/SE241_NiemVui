const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;

  try {
    console.log(logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};

module.exports = { logger, logEvents };
