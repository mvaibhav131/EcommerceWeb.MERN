
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");

//Create Product

const createProduct=catchAsyncError(async(req,res)=>{
    const newProduct= await Product.create(req.body);
    try{
        const saveProduct= await newProduct.save();
        res.status(201).send(saveProduct);
    }
    catch(e){
        res.status(500).send(e)
    }
});

//Get All Products

const getAllProducts=catchAsyncError(async(req,res)=>{
const products=await Product.find();
res.status(200).json({
    success:true,
    products
})
});

//Get Product Details

const getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);

    if(!product){
        // res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })

        return next(new ErrorHandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
});

//Update Product
 
const updateProduct=catchAsyncError(async(req,res)=>{
 let product= await Product.findById(req.params.id);
 if(!product){
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
    return next(new ErrorHandler("Product Not Found",404))
 }
 product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
});
res.status(200).json({
    success:true,
    product
})
});

//Delete Product

const deleteProduct=catchAsyncError(async(req,res)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product Not Found",404))
    }
   await product.remove();
   res.status(200).json({
    success:true,
    message:"Product deleted successfully"
   });
});


module.exports={createProduct,getAllProducts,updateProduct,deleteProduct,getProductDetails}
