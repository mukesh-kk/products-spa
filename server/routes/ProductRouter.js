const express = require('express')

const ProductRouter = express.Router();

const { CreateProduct, GetProduct } = require('../controllers/ProductController');

ProductRouter.post('/create', CreateProduct);
ProductRouter.get("/", GetProduct)

module.exports = ProductRouter;