const express=require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { createProductReview, getProductReviews, deleteReview } = require("../controllers/userController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

const router=express.Router();


router.get("/product",getAllProducts);
router.get("/product/:id",getProductDetails);
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin") ,createProduct);
router.put("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete("/product/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.put("/review",isAuthenticatedUser,createProductReview);
router.get("/reviews",getProductReviews);
router.delete("/reviews",isAuthenticatedUser,deleteReview);

module.exports=router;