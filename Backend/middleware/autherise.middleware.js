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

module.exports={Autherise}