const express=require('express');
const cors=require("cors")
const app=express();
require('dotenv').config()
const cookieParser = require("cookie-parser");
const port=process.env.PORT

const userRouter=require('./Routes/UserRoutes')
const dbconnect=require("./Config/db_config")
dbconnect()
app.use(cors({
    credentials: true,
    origin:['http://localhost:3000','http://192.168.0.100:3000']
   
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',userRouter)
app.listen(port,()=>{
    console.log("Server is listening at "+port)
})