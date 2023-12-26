const WishListModel=require('../model/WishModel');
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

const saveWishListService=async (req)=>{
   try{
       let reqBody=req.body;
       let user_id=req.headers.user_id;
       reqBody.userID=user_id;

      let data= await WishListModel.updateOne(reqBody,{$set:reqBody},{upsert:true});
       return {status:"success",data:"wish list save successful"};
   }

   catch (e) {
       return {status:"fail",data:e.toString()};
   }
}

const removeWishListService=async (req)=>{
    try{
        let reqBody=req.body;
        let user_id=req.headers.user_id;
        reqBody.userID=user_id;

        await WishListModel.deleteOne(reqBody);
        return {status:"success",data:"WishList delete successfull"};
    }

    catch (e) {
        return {status:"fail",data:e.toString()};
    }

}

const wishListService=async (req)=>{
   try{
       let user_id=new ObjectId(req.headers.user_id);
       let MatchStage={$match:{userID:user_id}};

       let ProductStage={$lookup:{from:'products',localField:'productID',foreignField:"_id",as:'product'}};
       let UnwindProductStage={$unwind:"$product"};

       let BrandStage={$lookup: {from:'brands',localField: 'product.brandID',foreignField: '_id',as:'brand'}};
       let UnwindBrandStage={$unwind: "$brand"};

       let CategoryStage={$lookup:{from:'categories',localField:'product.categoryID',foreignField:'_id',as:'category'}};
       let UnwindCategoryStage={$unwind:"$category"};
       let projectionStage={$project:{
               '_id':0,'userID':0,'createAt':0,'updatedAt':0, 'product._id':0,
               'product.categoryID':0,'product.brandID':0,
               'brand._id':0,'category._id':0,
           }}

       let data=await WishListModel.aggregate([
           MatchStage,
           ProductStage,
           UnwindProductStage,
           BrandStage,
           UnwindBrandStage,
           CategoryStage,
           UnwindCategoryStage,
           projectionStage
       ])

       return {status:'success',data:data};
   }
   catch (e) {
       return {status:'fail',data:e.toString()};
   }

}


module.exports={
    saveWishListService,
    removeWishListService,
    wishListService,
}