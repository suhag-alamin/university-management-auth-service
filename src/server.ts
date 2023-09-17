import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
let server: Server;

const main = async () => {
  try {
    await RedisClient.connect();
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');
    server = app.listen(config.port, () => {
      console.log(`University management app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      console.log(error);
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
};
main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
