const express = require('express')
const router = express.Router()

const productModel = require('../models/product')

//Product create API
router.post('/', (req, res) => {
    const newProduct = new prodcutModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: 'saved product',
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


//Product retrieve API
router.get('/total', (req, res) => {
    productModel
        .find()
        .then(doc => {
            res.json({
                message: 'total product data',
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//detail product retrieve API
router.get('/:productid', (req, res) => {
    productModel
        .findById(req.params.productid)
        .then(doc => {
            if (!doc) {
                res.json({
                    messae: "no product"
                })
            } else {
                res.json({
                    message: "detailed product",
                    productInfo: doc
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})



//delete detail product API
router.delete('/:productID', (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: "delete product"
            })
        })
        .catch(err =>{
            res.json({
                message: err.message
            })
        })
})


module.exports = router