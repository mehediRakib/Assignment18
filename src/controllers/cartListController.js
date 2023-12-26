const {saveCartListService, removeCartListService, CartListService} = require("../services/cartListService");
//
exports.saveCartList=async (req,res)=>{
    let data=await saveCartListService(req);
    res.status(200).json(data);
}

exports.removeCartList=async (req,res)=>{
    let data=await removeCartListService(req);
    res.status(200).json(data);
}

exports.cartList=async (req,res)=>{
    let data=await CartListService(req);
    res.status(200).json(data);

}

exports.updateList=async (req,res)=>{

}