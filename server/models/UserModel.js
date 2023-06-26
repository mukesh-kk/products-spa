const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        }
    }

);


const user = mongoose.model('user', userSchema);

module.exports = user;
