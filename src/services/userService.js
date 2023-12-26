const userModel=require('../model/UserMdoel');
const ProfileModel=require('../model/ProfileModel');

const SendMail = require("../utylity/emailHelper");
const {Encode} = require("../utylity/TokenHelper");

const OTPService=async (req)=>{
    try{
        const email=req.params.email;
        const code=Math.floor(100000+Math.random()*900000);
        const EmailText=`Your verification code is : ${code}`;
        const EmailSub="Assignment Back-end";
        await SendMail(email,EmailText,EmailSub);
        await userModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
        return {status:"success",message:"6 digit otp have been send"}
    }catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }


}

const OTPVerifyService=async (req)=>{
    try{
        let email=req.params.email;
        let otp=req.params.otp;

        let total=await userModel.find({email:email,otp:otp}).count('match');
        if(total===1){
            let user_id=  await userModel.find({email:email}).select('_id')

            let token=await Encode(email,user_id[0]['_id'].toString());

            await userModel.updateOne({email:email},{$set:{otp:0}});

            return {status:"success",message:"Verification successfull",token:token};
        }
    }
    catch (e) {
        return {status:"fail",message:"Invalid token"}
    }

}

const saveProfileService=async(req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({ userID: user_id},{ $set: reqBody},{ upsert: true });

        return {status:"success",data:"profile save success"};

    }catch (e) {
        return {status:"false",data:"Something Went wrong"}
    }

}

const readProfileService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let data=await ProfileModel.find({userID:user_id});
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:'Something went wrong'};
    }

}



module.exports={
    OTPService,
    OTPVerifyService,
    saveProfileService,
    readProfileService


}