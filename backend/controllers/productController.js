
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandalers");
const catchAsyncError= require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


//Create Product

const createProduct=catchAsyncError(async(req,res)=>{
    
    req.body.user=req.user.id;

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

const getAllProducts=catchAsyncError(async(req,res,next)=>{
    
    const resultPerPage=8;
    const productCount=await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products=await apiFeatures.query;
    res.status(200).json({
    success:true,
    products,
    productCount
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

