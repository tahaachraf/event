const express= require('express')
const app = express()
const cors= require('cors')
//const db =require('./database/connectionDB')
const eventRoute= require('./routes/evenementRoute')
const userRoute= require('./routes/userRoute')

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())     
app.use(eventRoute,userRoute) 


app.listen(5000, ()=>{console.log('Server is running with port 5000')})