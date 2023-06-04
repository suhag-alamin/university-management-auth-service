import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected')
    app.listen(config.port, () => {
      logger.info(`University management app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connecte', err)
  }
}
main()
