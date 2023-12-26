const {saveWishListService, removeWishListService,wishListService} = require("../services/wishListService");


exports.saveWishLsit=async (req,res)=>{
  let data=await saveWishListService(req);
  res.status(200).json(data);
}

exports.removeWishList=async (req,res)=>{
  let data=await removeWishListService(req);
  res.status(200).json(data);

}

exports.wishList=async (req,res)=>{
  let data=await wishListService(req);
  res.status(200).json(data);

}