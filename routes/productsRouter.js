const express = require('express')
const { getAllProducts } = require('./../controllers/productController')

const productsRouter = express.Router()

productsRouter.route('/getAllProducts').get(getAllProducts)

module.exports = productsRouter