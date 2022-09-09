const express=require("express");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController");
const router= express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


router.post("/order/new",isAuthenticatedUser,newOrder);
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);
router.get("/orders/me",isAuthenticatedUser,myOrders);


module.exports=router;