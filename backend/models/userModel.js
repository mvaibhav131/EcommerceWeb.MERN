const mongoose= require("mongoose");
const validator= require("validator");


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

module.exports = mongoose.model("user",userSchema);