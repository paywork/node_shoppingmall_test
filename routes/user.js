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

    userModel
        .findOne({email: req.body.email})
        .then(user =>{
            if(!user) {
                return res.json({
                    message: "no email"
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err || reulst === false) {
                        return res.json({
                            message: "password incorrect"
                        })
                    } else {
                        res.json(user)
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