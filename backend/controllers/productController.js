
const Product = require("../models/productModels");


//Create Product

const createProduct=async(req,res)=>{
    const newProduct= await Product.create(req.body);
    try{
        const saveProduct= await newProduct.save();
        res.status(201).send(saveProduct);
    }
    catch(e){
        res.status(500).send(e)
    }
}

//Get All Products

const getAllProducts=async(req,res)=>{
const products=await Product.find();
res.status(200).json({
    success:true,
    products
})
}

//Update Product
 
const updateProduct= async(req,res)=>{
 let product= await Product.findById(req.params.id);
 if(!product){
    return res.status(500).json({
        success:false,
        message:"Product not found"
    })
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
}

//Delete Product

const deleteProduct=async(req,res)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
   await product.remove();
   res.status(200).json({
    success:true,
    message:"Product deleted successfully"
   })
  
}


module.exports={createProduct,getAllProducts,updateProduct,deleteProduct}
