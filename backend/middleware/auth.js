const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User= require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async(req,res,next)=> {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to  access this resources",401));
    }
   const decodedData=jwt.verify(token,process.env.JWT_SECRET);
   req.user = await User.findById(decodedData.id);
   next();
});


const authorizeRoles= (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role ${req.user.role} is not allows to access this resources`,403));
        }
        next();
    };
};

module.exports={isAuthenticatedUser,authorizeRoles};