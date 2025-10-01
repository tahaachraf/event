const express= require('express')
const app = express()
//const db =require('./database/connectionDB')
const eventRoute= require('./routes/evenementRoute')


// const config = require('./config')
// const dotenv= require('dotenv')



// dotenv.config()
// const config={    host :process.env.MYSQL_HOST,
//     mysql : {
//         host : process.env.MYSQL_HOST,
//         user : process.env.MYSQL_USER,
//         password : process.env.MYSQL_PASSWORD,
//         database : process.env.MYSQL_DATABASE,
//         waitForConnections : true,
//         connectionLimit : 10}}
// const pool = mysql.createPool(config.mysql);

app.use(express.json())     


app.use(eventRoute) 


app.listen(5000, ()=>{console.log('Server is running with port 5000')})