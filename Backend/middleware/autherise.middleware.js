const jwt=require("jsonwebtoken");
const { UserModel } = require("../Models/user.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { catchAsyncError } = require("./catchAsyncError.middleware");



const Autherise=catchAsyncError(async(req,res,next)=>{
const {token}=req.cookies;

if(!token){
    return next(new ErrorHandler("Please Login To Access This Route"));
}
const decodedData=jwt.verify(token,process.env.JWT_SECRET);
const user=await UserModel.findById(decodedData.id);
req.user=user;
next();
})

const AutheriseRole=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role : ${req.user.role} Is Not Autherised To Do This Task`,401))
    }
    next();
  }
}

module.exports={Autherise,AutheriseRole}