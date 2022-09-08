const mongoose= require("mongoose");
const validator= require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema=  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please  Enter Your Name"],
        maxLength:[30,"Name canot exceed 30 charachers"],
        minLength:[3,"Name should have min 3 charachers"]
    },
    email:{
        type:String,
        required:[true,"Please  Enter Your Emails"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please  Enter Your Password"],
        minLength:[8,"Password should have minimum length is 8"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,11);
});

//JWT Token
userSchema.methods.getJWTToken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
})

}

module.exports = mongoose.model("user",userSchema);