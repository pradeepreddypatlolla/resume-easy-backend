const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        min:3,
        max:255,

    },
    email_id:{
        type: String,
        min:6,
        max:255,
        
    },
    password:{
        type: String,
        min:8,
        max:255,
        
    },
    details:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Details',
        
    }
})
const User=new mongoose.model('User',UserSchema);
module.exports={User}
