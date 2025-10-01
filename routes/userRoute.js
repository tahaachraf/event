const express=require('express')
const { ajouterUser, login, updateUser } = require('../controulers/userController')
const authentification = require('../middlewares/authentification')
const route= express.Router()

route.post('/register', ajouterUser)
route.post('/login', login)
route.put('/user/:id',updateUser)
module.exports=route