const product = require('../models/ProductModel');

const CreateProduct = async (req, res) => {

    const { name, image } = req.body;
    try {
        if (!name) {
            res.send('Product name is required');

        } else {
            await product.create(req.body);
            res.send('Successfully addded products')
        }

    } catch (err) {
        res.send('Something went wrong')
    }

}

const GetProduct = async (req, res) => {
    const ans = await product.find();
    res.status(200).json({ data: ans });
}
module.exports = {
    CreateProduct, GetProduct
}