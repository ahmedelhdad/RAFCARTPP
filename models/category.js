const mongoose = require('mongoose')

const cateShema = mongoose.Schema({
    img:String,
    title:String
})


const Cate = mongoose.model('Cate',cateShema)

module.exports = Cate