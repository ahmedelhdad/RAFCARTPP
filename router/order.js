const express = require('express')
const router = express.Router()

const order = require('../models/order')
const User = require('../models/user')

// Send request
router.post('/order', async(req, res) => {
    // const { id } = req.body
    const {user} = req.body
    const {email} = user
    const userId =await User.findOne({email})
    console.log(req.body)
    userId.history = [...userId.history,...req.body.orderItems]
    const orders = new order(
        req.body
    )
    userId.save()
    orders.save()
        .then((result) => res.json('Suc'))
        .catch((err) => console.log('err'))
        
})
// get Respons
router.get('/order', async (req, res) => {
    const data = await order.find()
    return res.json(data)
})

// Prearing or Finish
router.put('/order/update', async (req, res) => {
    const { id } = req.body
    const orders = await order.findById(id)
    try {
        if (orders.status === 'preparing') {
            orders.status = 'finish'
            orders.save()
            return res.json('Succ')

        } else {
            return res.json('finish')
        }
    } catch (err) {
        return res.json('Faulid')
    }
})



module.exports = router