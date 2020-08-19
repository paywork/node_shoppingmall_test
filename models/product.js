
//1번
const mongoose = require('mongoose')


//2번
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

//3번
module.exports = mongoose.model("product", productSchema);