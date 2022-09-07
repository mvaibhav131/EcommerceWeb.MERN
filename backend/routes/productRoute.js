const express=require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router=express.Router();


router.get("/product",getAllProducts);
router.get("/product/:id",getProductDetails);
router.post("/product/new",createProduct);
router.put("/product/:id",updateProduct);
router.delete("/product/:id",deleteProduct);

module.exports=router;