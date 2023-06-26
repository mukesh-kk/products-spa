const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    }

})

const product = mongoose.model('product', productSchema);
module.exports = product;