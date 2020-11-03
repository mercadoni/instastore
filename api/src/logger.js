const { createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf } = format;

const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
}

module.exports = createLogger({
  level: 'info',
  format: format(jsonFormatter)(),
  transports: [
    new transports.Console({
        handleExceptions: true,
        handleRejections: true,
    }),
    new transports.File({ 
        filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }),
    new transports.Console(),
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'rejections.log' }),
    new transports.Console(),
  ],
  exitOnError: false,
});


