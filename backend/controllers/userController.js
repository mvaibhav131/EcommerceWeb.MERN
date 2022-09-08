
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
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

  // const token= user.getJWTToken();
  // res.status(201).json({
  //   success:true,
  // user
  //   token,
  // })
  sendToken(user,201,res);
});

//Login User

const loginUser= catchAsyncError(async(req,res,next)=>{

  const {email,password}=req.body;
  //checking if user has given password and email both
  if(!email || !password){
    return next(new ErrorHandler("Please Enter Email & Password",400))
  }
  const user= await User.findOne({email}).select("+password");
  
  if(!user){
    return next(new ErrorHandler("Invalid Email or Password",401))
  }
  const isPasswordMatched= await user.comparePassword(password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",401))
  }
  // const token= user.getJWTToken();
  // res.status(200).json({
  //   success:true,
  //   token,
  // })
  sendToken(user,200,res);
});

// Logout User
const logout= catchAsyncError(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });
  res.status(200).json({
    success:true,
    message:"Logged Out Succesfully"
  });
});

// Forgot Password
const forgotPassword = catchAsyncError(async(req,res,next)=>{
   const user= await User.findOne({email:req.body.email});
   if(!user){
    return next(new ErrorHandler("User Not Found",404));
   }
//Get reset Password Token
const resetToken= user.getResetPasswordToken();

await user.save({validateBeforeSave:false});

const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

const message=`Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n IF you have not requested this mail then , Please ingnore it` ;

try{
  await sendEmail({
    email:user.email,
    subject:"Shopify Password Reset",
    message,
  });
  res.status(200).json({
    success:true,
    message:`Email send to ${user.email} successfully`,
  });

}
catch(error){
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;

  await user.save({validateBeforeSave:false});

  return next(new ErrorHandler(error.message,500));
 }
})

module.exports={registerUser,loginUser,logout,forgotPassword}