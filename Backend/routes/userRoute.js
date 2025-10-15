const express=require('express')
const { ajouterUser, login, updateUser,getAllUsers, deleteUser } = require('../controulers/userController')
const authentification = require('../middlewares/authentification')
const roleMangment = require('../middlewares/roleMangment')
const route= express.Router()

route.post('/register', ajouterUser)
route.post('/login', login)
route.put("/user/:id", authentification,roleMangment(['admin','dev']), updateUser);
route.get("/user", authentification,roleMangment, getAllUsers);
route.delete("/user/:id", authentification,roleMangment, deleteUser);
module.exports=route