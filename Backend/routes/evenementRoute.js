const express=require('express')
const route= express.Router()
const { ajoutevenment, afficheEvenement, modifierEvenement, suprimerEvenement, filtrageEvents } = require('../controulers/evenementController')
const authentification = require('../middlewares/authentification')

route.post('/evenements',authentification, ajoutevenment)

route.get('/evenements', afficheEvenement)  

route.put("/evenements:id", authentification, modifierEvenement); 

route.delete("/evenement:id", authentification, suprimerEvenement); 

route.get('/filtrageEvents', filtrageEvents);
module.exports=route