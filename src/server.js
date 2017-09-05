import path from 'path'
import express from 'express'
import serveStatic from 'serve-static'
import morgan from 'morgan'// Mogran是一个node.js关于http请求的日志中间件。
import Config from 'config-lite'

import { logger, loggerStream } from './common/logger'

let config = Config(__dirname)

let app = express()

app.use(morgan('dev', { stream: loggerStream })) // Mogran的使用参阅https://yq.aliyun.com/articles/2983
app.use(serveStatic(path.resolve(__dirname, '../public')))
// app.use('/api/logs', apiLogger)

if (module.parent) {
  module.exports = app
} else {
  let port = config.port || 2000
  app.listen(port, () => {
    // console.log(`listening on http://localhost:${config.port}`);
    // logger.silly(`listening on http://localhost:${config.port}`);
    // logger.debug(`listening on http://localhost:${config.port}`);
    // logger.verbose(`listening on http://localhost:${config.port}`);
    logger.info(`listening on :${port}`)
    // logger.warn(`listening on http://localhost:${config.port}`);
    // logger.error(`listening on http://localhost:${config.port}`);
  })
}
