
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");

//register User
const registerUser=catchAsyncError(async(req,res)=>{
  const {name,email,password}= req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar:{
        public_id:"these is id",
        url:"avtarurl",
    },
  });
  res.status(201).json({
    success:true,
    user
  })
});

module.exports={registerUser}