const express = require('express')
const router = express.Router()

const order = require('../models/order')
const products = require('../models/products')
const Users = require('../models/user')


router.get('/app/admin', async (req, res) => {
    const orders = await order.find()
    const product = await products.find()
    const users = await Users.find()

    const data = {
        totalOrders: orders.length,
        product: product.length,
        users: users.length,
    }
    return res.json(data)
})


module.exports = router