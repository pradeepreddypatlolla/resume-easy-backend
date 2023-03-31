const mongoose=require('mongoose')
require('dotenv').config()

const MONGODB_URI=process.env.MONGODB_URI
const dbconnect=()=>{
    mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then((conn)=>{
        console.log("connected to DB")
    }).catch(err=>{
        console.log(err);
    })}
module.exports=dbconnect