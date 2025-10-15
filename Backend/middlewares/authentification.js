const jwt=require('jsonwebtoken')
const db= require('../database/connectionDB')

module.exports=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).send({msg:"no token"})
    } 
    const token=authHeader.split(' ')[1].trim()
    if(!token){
        return res.status(401).send({msg:"no token"})
    }
    try {
        const decoded= jwt.verify(token,process.env.token)
        const r=await db.execute('select * from users where id_user=?',[decoded.id])
        
        req.user=r[0][0]
        next()
    } catch (error) {
        return res.status(401).send({msg:"invalid token"})
    }
    
}