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

const filtrageEvents=async (req,res)=>{
    const titre=req.body.titre;
    const date=req.body.date;
    const gov=req.body.gov;
    try {
        if(!titre && !date && !gov){
            return res.status(400).send({msg:"please provide at least one filter"})
        }
        else if (titre && !date && !gov){
            const sql='select * from evenements where Titre like ?;'
            const r = await db.execute(sql, [`%${titre}%`]);
            return res.status(200).send(r[0])
        } else if (!titre && date && !gov){
            const sql='select * from evenements where Date=?;'
            const r= await db.execute(sql,[date])
            return res.status(200).send(r[0])
        } else if (!titre && !date && gov){
            const sql='select * from evenements where gouvernorat=?;'
            const r= await db.execute(sql,[gov])
            return res.status(200).send(r[0])
        } else if (titre && date && !gov){
            const sql='select * from evenements where Titre like ? and Date=?;'
            const r= await db.execute(sql,[`%${titre}%`,date])
            return res.status(200).send(r[0])
        } else if (titre && !date && gov){
            const sql='select * from evenements where Titre like ? and gouvernorat=?;'
            const r = await db.execute(sql, [`%${titre}%`, gov]);
            return res.status(200).send(r[0])
        }else if (!titre && date && gov){
            const sql='select * from evenements where Date=? and gouvernorat=?;'
            const r= await db.execute(sql,[date,gov])
            return res.status(200).send(r[0])
        }else {
            const sql='select * from evenements where Titre like ? and Date=? and gouvernorat=?;'
            const r = await db.execute(sql, [`%${titre}%`, date, gov]);
            return res.status(200).send(r[0])
        } 
    } catch (error) {
        res.status(400).send({msg:error})   
    }
    
}

module.exports = {
    filtrageEvents,
    ajoutevenment,
    afficheEvenement,
    modifierEvenement,
    suprimerEvenement

}