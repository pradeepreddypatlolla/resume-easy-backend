const mongoose=require('mongoose');
const schema=mongoose.Schema;

const DetailsSchema=new schema({
   personalDetails:{
    type:Object
   },
   summary:{
      type:String
   },
   educationDetails:{
    type:Array
   },
   experienceDetails:{
    type:Array
   },
   skills:{
    type:Array
   },
   projects:{
    type:Array
   },
   certifications:{
    type:Array
   }
    
})

const Details=new mongoose.model('Details',DetailsSchema)
module.exports={Details}