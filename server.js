const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const userRoute = require('./routes/user')

// 데이터베이스 연결
require('./config/database')




//미들웨어 설정
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//라우팅
app.use('/product', productRoute)
app.use('/order', orderRoute)
app.use('/user', userRoute)



const PORT = 7000

app.listen(PORT, console.log('server started'))