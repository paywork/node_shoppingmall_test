const mongoose = require('mongoose')

//데이터베이스 연결
const dbaddress = "mongodb+srv://admin:admin12345@cluster0.n0hfu.mongodb.net/node_shoppingmall_test?retryWrites=true&w=majority"


const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbaddress, dboptions)
    .then(_ => console.log("mongodb connected"))
    .catch(err => console.log(err.message))
