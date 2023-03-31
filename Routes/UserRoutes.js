const express=require('express');
const router=express.Router();
const {User}=require('../Models/UserModel')
const {signUp,login,addDetails}=require('../Controllers/UserController');
const { ValidateToken } = require('../Middleware/Auth');
router.post('/signup',signUp)
router.post('/login',login)
router.post('/addDetails',ValidateToken,addDetails)

module.exports=router