const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        defualt: 1  //안 적어도 됨
    }
})





module.exports = mongoose.model("order", orderSchema)