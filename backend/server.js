const express=require('express');
const dotenv= require("dotenv");
const cors= require("cors");
const connection = require("./database");
const productroutes=require("./routes/productRoute");
const userroute=require("./routes/userRoute");
const orderroute=require("./routes/orderRoute");
const errorMiddlewares= require("./middleware/error");
const cookieParser= require("cookie-parser");

const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

//config
dotenv.config({path:'config/config.env'});

//Route
app.use("/api/v1",productroutes);
app.use("/api/v1",userroute);
app.use("/api/v1",orderroute);

//Middlewares
app.use(errorMiddlewares);

app.get('/',(req,res)=>res.send('Hello'));



app.listen(process.env.PORT,async()=>{
    try{
        await connection();
        console.log("connected to MongoDB");
    }
    catch(e){
        console.log("error",e);
    }
console.log(`server started port ${process.env.PORT}  `);
});