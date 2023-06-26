const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    , status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    feedback: {
        type: String,

    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }



}, { timestamps: true });
const order = mongoose.model('order', orderSchema);
module.exports = order;