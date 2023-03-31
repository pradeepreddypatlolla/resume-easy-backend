

const jwt=require('jsonwebtoken')
exports.ValidateToken=(req,res,next)=>{

    const {token}=req.cookies
    //console.log(req.cookies)
    if(!token){
        res.send({success:false, message:"Unauthorized user"})
    }
    else{
        const verifyUser=jwt.verify(token,process.env.SECRET_TOKEN)
        console.log(verifyUser)
        if(verifyUser){
            next()
        }
        else{
            res.send({success:false,message:"Invalid Token"})
        }
       
    }

}