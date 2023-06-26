const order = require('../models/OrderModel');

const GetOrders = async (req, res) => {

    const { userId } = req.query;


    try {
        if (userId) {
            const allOrderByUser = await order.find({
                userId: userId
            }).populate('productId', 'name image')
            res.status(200).json({ data: allOrderByUser })
        } else {
            res.send("Please send proper user id");
        }

    } catch (err) {

        res.send("Something went wrong");
    }



}
const CreateOrder = async (req, res) => {


    const { userId, productId } = req.body;
    console.log(req.body);

    try {
        if (!(userId && productId)) {
            res.send('userId,productId is required');
        } else {
            await order.create(req.body);
            res.send('Order Placed succesfully');
        }


    } catch (err) {
        res.send('Somethign went wrong');
    }

}

const UpdateOrderFeedback = async (req, res) => {

    const { id } = req.params;
    const data = req.body;
    try {
        if (id) {
            const foundOrder = await order.findById(id);
            if (!foundOrder) {
                res.send('Order not found');
            } else {
                await order.updateOne({ _id: id }, data);
                res.send('Updated succesfully')
            }
        }

    } catch (err) {

        res.send('Something went wrong');
    }





}
const DeleteOrder = async (req, res) => {

    const { id } = req.params;

    try {
        if (id) {
            const foundOrder = await order.findByIdAndDelete(id);
            if (!foundOrder) {
                res.send('Order not found');
            } else {

                res.send('Deleted succesfully')
            }
        }

    } catch (err) {

        res.send('Something went wrong');
    }





}

module.exports = { GetOrders, CreateOrder, UpdateOrderFeedback, DeleteOrder };