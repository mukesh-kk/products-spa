const express = require('express');
const router = express.Router();
const OrderRouter = require('./OrderRouter.js');
const UserRouter = require('./UserRouter.js');
const ProductRouter = require('./ProductRouter.js')
router.use('/order', OrderRouter);
router.use('/user', UserRouter);
router.use('/product', ProductRouter);

module.exports = router;