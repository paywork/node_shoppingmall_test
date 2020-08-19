const express = require('express')
const router = express.Router()

const productModel = require('../models/product')

//Product create API
router.post('/register', (req, res) => {
    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: 'saved product',
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        ur: "http://localhost:7000/product/" + doc._id
                    }
                }
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
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:7000/product/" + item._id
                        }
                    }

                })
            }
            res.json(response)
        })
        .catch(err => {
            res.json({
                err: err.message
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
                    message: "no product"
                })
            } else {
                res.json({
                    message: "detailed product",
                    productInfo: {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:7000/product/total"
                        }
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})

// product update API
// router.patch('/', (req, res) => {
//     res.json({
//         message: 'product upadate API'
//     })
router.patch('/:productID', (req, res) =>{
    const updateItems = {}
    for (const items of req.body) {
        updateItems[items.propName] = items.value;
    }

    productModel
        .findByIdAndUpdate(req.params.productID, {$set: updateItems})
        .then(_ => {
            res.json({
                message: "update product at" + req.params.productID,
                request: {
                    type: "GET",
                    url: "http://localhost:7000/product/" +req.params.productID
                }
            })
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
                message: "delete product",
                request: {
                    type: "GET",
                    url: "http://localhost:7000/product/total"
                }
            })
        })
        .catch(err =>{
            res.json({
                message: err.message
            })
        })
})


module.exports = router