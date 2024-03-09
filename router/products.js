const express = require('express')
const router = express.Router()

const producds = require('../models/products')



router.post('/products', (req, res) => {
    const product = new producds({
        ...req.body
    })
    product.save()
        .then((result) => res.json('success Add'))
        .catch((err) => console.log(err))
    // console.log(req.body)
})

router.get('/products', (req, res) => {
    producds.find().select("-__v")
        .then((result) => res.json(result))
        .catch((err) => console.log(res))
})

router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const Cate = await producds.findById(id)
    Cate.view++;
    await Cate.save()
    res.json(Cate)
})

router.get('/:category', (req, res) => {
    const { category } = req.params
    producds.find(({ category }))
        .then((result) => res.json(result))
        .catch((err) => console.log(err))
})
router.get('/page/arrival', async (req, res) => {
    const category = 'Outdoor'
    const Data = await producds.find({ category })
    res.json(Data)
})
router.get('/page/recomended', async (req, res) => {
    const category = 'Sofa'
    const Data = await producds.find({ category })

    res.json(Data)
})
router.put('/updatap/product', async (req, res) => {
    // Founded Product 
    const product = await producds.findById(req.body._id)
    product.save()
    product.update(req.body)
        .then((result) => res.json(result))
        .catch(() => console.log('err'))

})
router.post('/delete/product', (req, res) => {
    const { id } = req.body
    producds.findByIdAndDelete(id)
        .then(() => res.json('Success Delete'))
        .catch(() => console.log('err'))
})
module.exports = router
