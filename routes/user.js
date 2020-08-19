const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')


//회원가입
router.post('/signup', (req, res) =>{


    //이메일 유무 체크  => 이메일이 있으면 아래 처럼 나오고 없으면 PASSWORD 암호화
   userModel
       .findOne({email: req.body.email})
       .then(user => {
           if(user) {
               return res.json({
                   message: "email exists"
               })
           } else {
               bcrypt.hash(req.body.password, 10, (err, hash) => {
                   if (err){
                       return res.json({
                           error: err.message
                       })
                   } else {
                       const newUser = new userModel({
                           name: req.body.username,
                           email: req.body.email,
                           phone: req.body.phone,
                           password: hash
                       })

                       newUser
                           .save()
                           .then(user => {
                               res.json({
                                   message: "regisered user",
                                   userInfo: user
                               })
                           })
                           .catch(err => {
                               res.json({
                                   message: err.message
                               })
                           })

                   }
               })
           }
       })




})

//로그인
router.post('/login', (req, res) => {
    //이메일 유무 체크 그 다음 패스워드 DB에 있는 패스워드 있는지 체킹(복호화) 그 다음 사용자 유저 정보를 암호화 이걸 토큰 이라고 한다
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.json({
                    message: "no email"
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err || result === false) {
                        return res.json({
                            message: "password incorrect"
                        })
                    } else {
                        res.json({
                            userInfo: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                password: user.password
                            }
                        })
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










module.exports = router