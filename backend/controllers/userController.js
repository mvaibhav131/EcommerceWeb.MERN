
const User = require("../models/userModel");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

const message=`Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n IF you have not requested this mail then , Please ingnore it` 

try{
  await sendEmail({
    email:user.email,
    subject:"Shopify Password Reset",
    message
  })
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
});

//Reset Password
const resetPassword= catchAsyncError(async(req,res,next)=>{
  //creating token hash
  const resetPasswordToken=crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user= await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt: Date.now()},
  });
  if(!user){
    return next(new ErrorHandler("Reset Password token is Invalid or has been expired",400));
   }
   if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password does not matched",400));
   }
   user.password=req.body.password;
   user.resetPasswordToken=undefined;
   user.resetPasswordExpire= undefined;

   await user.save();
   sendToken(user,200,res)
});

// Get Uer Details
const getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  });
});


//Update User Password
const updatePassword = catchAsyncError(async(req,res,next)=>{

  const user = await User.findById(req.user.id).select("+password")
  
  const isPasswordMatched= await user.comparePassword(req.body.oldPassword);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Incorrect OldPassword",400))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
      return next(new ErrorHandler("Password does not matched !",400))
    }
    user.password=req.body.newPassword;
    await user.save();

    res.status(200).json({
      success:true,
      user,
    });
});

//Update User Profile
const updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  };
  // We will add cloudnary later
  const user= await User.findByIdAndUpdate(req.user.id ,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    user
  });
});

//Get all users
const getAllUsers= catchAsyncError(async(req,res,next)=>{

  const users= await User.find();
   res.status(200).json({
    success:true,
    users,
   });
});

//Get single User Admin
const getSingleUser= catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User does not exists",400));
  }
  res.status(200).json({
    success:true,
    user,
   });
});

//Update User Role --admin
const updateUserRole = catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  };
  // We will add cloudnary later
  const user= await User.findByIdAndUpdate(req.params.id ,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    user
  });
});

//Delete User
const deleteUser=catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User does not exists",400));
  }
  await   user.remove();

  res.status(200).json({
    success:true,
    message:"User Deleted Successfully",
  });
});

// create New Review or Update the Review

const createProductReview=catchAsyncError(async(req,res,next)=>{
 const {rating,comment,productId}= req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  };

  const product= await Product.findById(productId);
 
  const isReviewed= product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

  if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString()=== req.user._id.toString())
      (rev.rating= rating),(rev.comment=comment);
    });
 }
 else{
  product.reviews.push(review);
  product.noOfReviews=product.reviews.length;
 }

 let avg=0;
  product.reviews.forEach(rev=>{
  avg = avg + rev.rating;
 })
product.ratings=avg/product.reviews.length;

 await product.save({validateBeforeSave:false});

 res.status(200).json({
  success:true,
});
});

//Get All Reivew of product

const getProductReviews= catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.querry.id);

  if(!product){
    return next(new ErrorHandler("Product Not Found",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
  });
});

//Delete Review

const deleteReview= catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product Not Found",404));
  }

  const reviews= product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString());

    let avg=0;
  reviews.forEach(rev=>{
  avg = avg + rev.rating;
 })
const ratings=avg/reviews.length;

const noOfReviews= reviews.length;
await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  ratings,
  noOfReviews
},{
  new:true,
    runValidators:true,
    useFindAndModify:false,
});

res.status(200).json({
    success:true,
    });
})




module.exports={registerUser,loginUser,logout,forgotPassword,deleteUser,resetPassword,getProductReviews,getUserDetails,updateUserRole,updatePassword,updateProfile,getAllUsers,getSingleUser,deleteReview,createProductReview}