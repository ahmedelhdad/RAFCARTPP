const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    title:String,
    description:{type:String},
    category:String,
    img:String,
    price:{
        type:Number,

    }, 
    availability:{
        type:Number
    },
    aboutProduct:{
        type:String
    },
    ratings:{
        type:Number,
        default:0
    },
    pricerival:{
        type:Number,
        default:0.0
    }, 
    sku:{
        type:String
    },
    view:{
        type:Number,
        default:0
    }, 
})

const products = mongoose.model('products',productsSchema)


module.exports = products