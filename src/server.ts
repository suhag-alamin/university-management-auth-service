import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected');
    server = app.listen(config.port, () => {
      logger.info(`University management app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      errorLogger.error(error);
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
};
main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
