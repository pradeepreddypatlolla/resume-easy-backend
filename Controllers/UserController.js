const { Details } = require('../Models/DetailsModel')
const {User}=require('../Models/UserModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const signUp=async(req,res)=>{
  //  console.log(req.body)
    const {name,emailId,password}=req.body
    const isUserPresent=await User.findOne({email_id:emailId})
   // console.log(isUserPresent)
    if(isUserPresent!=null){
        res.status(200).json({success:false,payload:null,message:"User already present"})
    }
    else{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
   
    let details = new Details({
        personalDetails:{
            "name":""

        },
        summary:"",
        educationDetails:[],
        experienceDetails:[],
        skills:[],
        projects:[],
        certifications:[]
    })
    let detailsRes = await details.save()
    const user=new User({
        name:name,
        email_id:emailId,
        password:hashedPassword,
        details:detailsRes._id
    })
    
    const userRes=await user.save()
  //  console.log(userRes)
    res.status(200).json({success:true,
        payload:{userRes,detailsRes}
    })
    
}
}

const login=async(req,res)=>{
   // console.log(req.body)
    const user=await User.findOne({email_id:req.body.emailId})
    if(!user){
       // console.log("No user")
        res.status(401).json({success:false,payload:null,message:"User Not fount"})
    }
    else{
        
       // console.log(user)
       
        const isValidUser=await bcrypt.compare(req.body.password,user.password)
        if(!isValidUser){
          //  console.log("Wrong PAss")
            res.status(401).json({success:false,payload:null,message:"Wrong Password"})
        }
        else{
           // console.log("Success")
            const user=await User.findOne({email_id:req.body.emailId})
            const details = await Details.findById(user.details)
            const token=jwt.sign({id:req.body.emailId},process.env.SECRET_TOKEN,{
                expiresIn:'24h'
            })
          //  console.log(details)
            const cookieOptions = {
                httpOnly: true
            }
            res.cookie("token",token,cookieOptions).send({success:true,payload:{user:user,details:details} ,message:"Logged In Successfully"})
        }
    }
}

const isUserPresent=async(emailId)=>{
    const user=await User.findOne({email_id:emailId})
    console.log(user)
    if(user==null)
        return false
    else
        return true
}
const addDetails=async(req,res)=>{
    try {
        const user= await User.findOne({email_id:req.body.emailId})
    let details = await Details.findById(user.details)
    let {personalDetails,summary,educationDetails,experienceDetails,skills,projects,certifications} = req.body.details 
    details.personalDetails=personalDetails
    details.summary=summary
    details.educationDetails=educationDetails
    details.experienceDetails=experienceDetails
    details.skills = skills
    details.projects = projects
    details.certifications = certifications
    let detailsRes= await details.save()
    console.log(detailsRes);
    res.status(200).json({success:true,payload:detailsRes,message:"Details added"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
    
}
module.exports={signUp,login,isUserPresent,addDetails}