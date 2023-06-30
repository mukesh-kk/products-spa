const redis = require('redis')
const redisClient = redis.createClient({
    url: process.env.REDIS_LINK
});
redisClient.on('error', error => {
    console.error(error)
})

redisClient.on('connect', () => {
    console.log("Connected to redis ")
})

redisClient.on('ready', () => {
    console.log("Connected to redis and ready to use")
})

redisClient.on('end', () => {
    console.log("Client disconnected from redis")
})
module.exports = redisClient;
