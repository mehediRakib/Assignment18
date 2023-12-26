
const {DecodeToken} = require("../utylity/TokenHelper");


module.exports=async (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        token = req.cookies['token']
    }

   const data= await DecodeToken(token);
    if(data===null){
        res.status(401).json({status:"fails",message:"Unauthorized"})
    }
    else{
        let user_id=data['user_id'];
        let email=data['email'];
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();
        }

}