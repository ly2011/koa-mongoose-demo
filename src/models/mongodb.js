import mongoose from 'mongoose';
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

import config from '../configs';
// connect mongodb
const mongoLink = config.mongodb.url,
  mongoSecret = config.mongodbSecret;
mongoose.connect(mongoLink, { useMongoClient: true });

mongoose.connection.on('error', console.error);
