const express = require('express')
const app = express()



app.use((req, res) => {
    res.json({
        message: '테스트 okay'
    })
})






const PORT = 7000



app.listen(PORT, console.log('server started'))