const db = require('../database/connectionDB')
const ajoutevenment=async (req,res)=>{
    const e= req.body;
    console.log(e)
   
    try {
        
        const sql= "INSERT INTO evenements (`ID`, `Titre`, `Description`, `Date`, `Lieu`, `ImgEvent`, `Heure`) VALUES (NULL, ?, ?, ?, ?, ?, ?);"
        await db.execute(sql,[e.titre, e.description, e.date, e.lieu, e.imgEevnt, e.heur])
        res.status(201).send({msg:"ok"})
    } catch (error) {
        res.status(400).send({msg:error})
    }

    
}  

const afficheEvenement= async (req, res)=>{
    try { 
        const r = await db.execute('select * from evenements')
        console.log(r)
        res.status(200).send({messeg:"Ok", data:r[0]}) 
    } catch (error) {
        res.status(400).send({msg:error})
    }
}

const modifierEvenement= async (req, res)=>{
    try {
        const {id} = req.params
        const e = req.body 
        console.log(id) 
        const sql ='UPDATE evenements SET Titre = ?, Discription = ?, Date = ?, Lieu = ?, imgEvent = ?, Heure =  ? WHERE ID = ?;'
        const r = await db.execute(sql, [e.titre, e.description, e.date, e.lieu, e.imgEvent, e.heur, id])
        res.status(200).send({message:"Event updated", data:r})
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
}

const suprimerEvenement= async (req, res)=>{
    try {
        const {id} = req.params
        const sql = 'delete from evenements where id=?'
        await db.execute(sql, [id])
        res.status(200).send({message:"Event deleted"})      
        
    } catch (error) {
       res.status(400).send({msg:error}) 
    }
}
module.exports = {
    ajoutevenment,
    afficheEvenement,
    modifierEvenement,
    suprimerEvenement

}