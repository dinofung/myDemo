import winston from 'winston'
import 'winston-daily-rotate-file'
import moment from 'moment'
import fs from 'fs'
import path from 'path'

let logsFolder = './logs'

if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder)
}

winston.emitErrs = true
const logFileLevel = process.env.logFileLevel || 'silly'
const consoleLevel = process.env.consoleLevel || 'silly'
const logger = new winston.Logger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      level: logFileLevel,
      filename: path.join(logsFolder, '/myDemo.'),
      datePattern: 'yyyy-MM-dd.log',
      perpend: true,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      formatter: function (options) {
        // Return string will be passed to logger.
        return `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}\t${options.level.toUpperCase()}\t${options.message || ''}${options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''}`
      }
    }),
    new (winston.transports.Console)({
      level: consoleLevel,
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})

const loggerStream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

export {
  logger,
  loggerStream
}
