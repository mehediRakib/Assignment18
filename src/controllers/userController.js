const {OTPService, OTPVerifyService, saveProfileService, readProfileService} = require("../services/userService");


exports.otpService=async (req,res)=>{
    let result=await OTPService(req);
    res.status(200).json(result);
}

exports.verifyOTP=async (req,res)=>{
    let result=await OTPVerifyService(req);
    if(result['status']==='success'){
        let cookieOption={expires:new Date(Date.now()+24*6060*1000),httponly:false};
        res.cookie('token',result['token'],cookieOption);
        res.status(200).json(result);
    }
    else {
        res.status(200).json(result);
    }
}

exports.LogOut=async (req,res)=> {
    try {
        let cookieOption = {expires: new Date(Date.now() - 24 * 6060 * 1000), httponly: false};
        res.cookie('token', "", cookieOption)
        res.status(200).json({status: "success", message: "Logout successfull"})

    } catch (e) {
        res.status(200).json({status: "failed", message: "Logout failed"})

    }
}


exports.createProfile=async (req,res)=>
   {
       let result=await saveProfileService(req);
       res.status(200).json(result);
   }

exports.updateProfile=async (req,res)=>
{
    let result=await saveProfileService(req);
    res.status(200).json(result);
}


exports.readProfile=async (req,res)=>{
    let result=await  readProfileService(req);
    res.status(200).json(result);
}

