const mongoose = require('mongoose')
class Mongo {
    /**
     * creates connection with mongodb
     */
    constructor() {
        const proto = Object.getPrototypeOf(this);
        if (!proto.connection) {


            proto.connection = mongoose.connect(`${process.env.MONGOURL}`, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: { version: '1' } })
        }
    }
}

module.exports = Mongo;