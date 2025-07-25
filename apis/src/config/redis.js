// utils/redis.js
const Redis = require('ioredis');
const dotenv = require("dotenv");
dotenv.config();
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

module.exports = redisClient;
  