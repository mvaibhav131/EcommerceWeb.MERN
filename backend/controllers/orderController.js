const Order= require("../models/orderModel");
const Product = require("../models/productModels");
const ErrorHandler= require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");

//Create New Order
 const newOrder= catchAsyncError(async(req,res,next)=>{
     const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
     const order= await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
     });
     res.status(201).json({
        success:true,
        order,
     });
 });

 //get Single User
 const getSingleOrder= catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate("user","name email");
     if(!order){
        return next(new ErrorHandler("Order not found", 404));
     }
     res.status(200).json({
        success:true,
        order,
     });
 });

  //get logged in User order details
  const myOrders= catchAsyncError(async(req,res,next)=>{
    const orders= await Order.find({user:req.user._id});
    
     res.status(200).json({
        success:true,
        orders,
     });
 });

 //get All orders --Admin
 const getAllOrders= catchAsyncError(async(req,res,next)=>{
   const orders= await Order.find();
   
  let totalAmmount=0;
  orders.forEach((order)=>{
   totalAmmount = totalAmmount+order.totalPrice;
  });

    res.status(200).json({
       success:true,
       totalAmmount,
       orders,
    });
});

 module.exports={newOrder,getSingleOrder,myOrders,getAllOrders};