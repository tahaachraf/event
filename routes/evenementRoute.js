const express=require('express')
const { ajoutevenment, afficheEvenement, modifierEvenement, suprimerEvenement } = require('../controulers/evenementController')
const route= express.Router()

route.post('/evenements', ajoutevenment)

route.get('/evenements', afficheEvenement)  //evenements

route.put('/evenements:id', modifierEvenement) 

route.delete('/evenement:id', suprimerEvenement) 

module.exports=route