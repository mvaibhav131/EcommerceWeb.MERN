const express=require('express');
const dotenv= require("dotenv");


const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//config
dotenv.config({path:'config/config.env'});

app.get('/',(req,res)=>res.send('Hello'));



app.listen(process.env.PORT,()=>{
console.log(`server started port ${process.env.PORT}  `);
});