const express = require('express')
const router = express.Router()

const Category = require('../models/category')


router.get('/category',(req,res) => {
    Category.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(res))
})


module.exports = router