const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

//데이터베이스 연결
const dbaddress = "mongodb+srv://admin:admin12345@cluster0.n0hfu.mongodb.net/node_shoppingmall_test?retryWrites=true&w=majority"

mongoose
    .connect(dbaddress, {useNewUrlParser: true, useUnifiedTopology: true})

//미들웨어 설정
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))




app.use('/product', productRoute)





const PORT = 7000

app.listen(PORT, console.log('server started'))