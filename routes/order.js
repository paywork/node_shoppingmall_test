const express = require('express')
const router = express.Router()
const orderModel = require('../models/order')

// order create API
router.post('/', (req, res) =>{

    const newOrder = new orderModel({
        product: req.body.productID,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(item => {
            res.json({
                message: "saved order",
                orderInfo: {
                    id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:7000/order/" + item._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                err: err.message
            })
        })

})

// order retrieve APi
router.get('/total', (req, res) => {
    orderModel
        .find()
        .populate("product", ["name", "price"])
        .then(items => {
            if(items.length === 0){
                return res.json({
                    message: "no order count"
                })
            } else {
                console.log("--------------", items)
                const response  = {
                    count: items.length,
                    products: items.map(item => {
                        return{
                            id: item._id,
                            quantity: item.quantity,
                            product: item.product,
                            request: {
                                type: "GET",
                                url: "http://localhost:7000/order/" + item._id
                            }
                        }
                    })
                }
                res.json(response)
            }

        })
        .catch(err => {
            res.json({
                err: err.message
            })
        })
})

// detail order retrieve APi
router.get('/:orderid', (req, res) => {
    orderModel
        .findById(req.params.orderid)
        .then(item => {
            // console.log("--------------", item)
            if(!item) {
                res.json({
                    message: "no order"
                })
            } else {
                res.json({
                    message: "detail order",
                    orderInfo: {
                        id: item._id,
                        quantity: item.quantity,
                        product: item.product,
                        request: {
                            type: "GET",
                            url: "http://localhost:7000/order/total"
                        }
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                err: err.message
            })
        })
})

// order update API
router.patch('/:orderid', (req, res) => {

})

// order delete API
router.delete('/:orderid', (req, res) => {
    orderModel
        .findByIdAndDelete(req.params.orderid)
        .then(() => {
            res.json({
                message: "deleted order",
                request: {
                    type: "GET",
                    url: "http://localhost:7000/order/total"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


module.exports = router