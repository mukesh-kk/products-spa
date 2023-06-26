const express = require('express')
const OrderRouter = express.Router();
const { GetOrders, CreateOrder, UpdateOrderFeedback, DeleteOrder } = require('../controllers/OrderAndFeebackController')
OrderRouter.get('/', GetOrders);
OrderRouter.post('/', CreateOrder);
OrderRouter.patch('/:id', UpdateOrderFeedback);
OrderRouter.delete('/:id', DeleteOrder);
module.exports = OrderRouter;