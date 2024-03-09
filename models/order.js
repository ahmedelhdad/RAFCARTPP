const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        img:{
            type:String,
            required: true
        },
    },
    orderItems: [
        {
            title: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            img: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    status:{
        type:String,
        default:'preparing'
    }
},{
    timestamps: true,
})

const order = mongoose.model('order',orderSchema)

module.exports = order