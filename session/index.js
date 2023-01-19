const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT || 10287,
    password: process.env.REDIS_PW
});

module.exports = redis;