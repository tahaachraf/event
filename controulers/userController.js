const db = require("../database/connectionDB");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");

const ajouterUser = async (req, res) => {
  const u = req.body;
  console.log(u)
  try {
    const newPassword = await bcrypt.hash(u.password, 10);
    u.password = newPassword;
    sql =
      "INSERT INTO users (`id_user`, `user_name`,`user_login`, `user_email`, `user_password`, `user_role`) VALUES (NULL, ?, ?, ?, ?);";
    await db.execute(sql, [u.name,u.login , u.email, u.password, u.role]);
    
    const token = await jwt.sign({id: u.id_user} , process.env.token ,{expiresIn:'1h'})
    res.status(201).send({ msg: "ok" ,token});
  } catch (error) {
    res.status(400).send({ msg: error } )
  }
}

const login=async (req,res)=>{
    const {login,password}=req.body;
    try {
        const sql='select * from users where user_login=?'
        const r= await db.execute(sql,[login])
        if(r[0].length==0){
            return res.status(400).send({msg:"login incorrect"})
        }  
        const user=r[0][0]
        const match= await bcrypt.compare(password,user.user_password)
        if(!match){
            return res.status(400).send({msg:"password incorrect"})
        }
        const token = await jwt.sign({id: user.id_user} , process.env.token ,{expiresIn:'1h'})
        res.status(200).send({msg:"ok", token})
    } catch (error) {
        res.status(400).send({msg:error})
    }
}
const updateUser= async (req,res)=>{
    const {id}= req.params
    const u=req.body
    try {
        const sql='update users set user_name=?, user_login=?, user_email=?, user_password=?, user_role=? where id_user=?'
        await db.execute(sql,[u.name,u.login,u.email,u.password,u.role,id])
        res.status(200).send({msg:"user updated"})
    } catch (error) {
        res.status(400).send({msg:error})
    }
}

module.exports = {
  ajouterUser,login,updateUser
};