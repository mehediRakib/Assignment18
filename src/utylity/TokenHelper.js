const jsonWebToken=require('jsonwebtoken');

const Encode=async (email,user_id)=>{
    let key="ABC123-DEF";
    let Expire={expiresIn:"24h"};
    let payload={
        email:email,
        user_id:user_id,
    }
    return  jsonWebToken.sign(payload,key,Expire);
}

const DecodeToken=async (token)=>{
    try{
        let key="ABC123-DEF";
        return jsonWebToken.verify(token,key);
    }catch (e){
        return null;
    }
}
module.exports={
    Encode,
    DecodeToken,
}