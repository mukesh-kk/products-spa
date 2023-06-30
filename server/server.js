const express = require('express');
const dotenv = require("dotenv");
const router = require('./routes/Routes.js');
const cors = require('cors');
const Mongo = require('./db/mongo.js');
const redis = require('redis');
const redisClient = require('./db/redis.js');
dotenv.config();
const app = express();
const port = process.env.APP_PORT;
// parse json request body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use('/api', router);

new Promise((resolve, reject) => {

    const mongo = new Mongo();
    resolve(mongo.connection);

}).then(async () => {
    console.log('Connnected to DB');
    await redisClient.connect();
    app.listen(8080, () => {
        console.log('App running at 8080')
    })

}).catch((err) => {
    console.log('Could Not connect to DBs');
})

