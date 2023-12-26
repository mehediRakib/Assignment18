const cartModel=require('../model/CartModel');
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

const saveCartListService=async (req)=>{
    try{
        let user_id=new ObjectId(req.headers.user_id);
        let reqBody=req.body;
        reqBody.userID=user_id;
        await cartModel.create(reqBody);
        return {status:'success',data:"cartList created successfully"};

    }catch (e) {
        return {status:"fail",data:e.toString()};
    }

}

const removeCartListService=async (req)=>{
    try{
        let user_id=new ObjectId(req.headers.user_id);
        let reqBody=req.body;
        reqBody.userID=user_id;
        await cartModel.deleteOne(reqBody);
        return {status:'success',data:'Cartlist delete successfull'};
    }
    catch (e) {
        return {status:'fail',data:e.toString()};
    }
}

const CartListService=async (req)=>{
    try{
        let user_id=new ObjectId(req.headers.user_id);

        let MatchStage={$match:{userID:user_id}};
        let productStage={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage={$unwind:"$product"};

        let BrandStage={$lookup: {from: 'brands',localField: 'product.brandID',foreignField: '_id',as:"brand"}};
        let unwindBrandStage={$unwind: "$brand"};

        let CategoryStage={$lookup: {from: 'categories',localField: 'product.categoryID',foreignField: '_id',as:"category"}};
        let unwindCategoryStage={$unwind: "$category"};

        let projectionStage={$project:{
                '_id':0,'userID':0,'createAt':0,'updatedAt':0, 'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0,
            }}


        let data=await cartModel.aggregate([
            MatchStage,
            productStage,
            unwindProductStage,
            BrandStage,
            unwindBrandStage,
            CategoryStage,
            unwindCategoryStage,
            projectionStage
        ])

        return {status:'success',data:data};
    }
    catch (e) {
        return {status:"fail",data:e.toString()};
    }

}

const cartListUpdateService=async (req,res)=>{

}


module.exports={
    saveCartListService,
    removeCartListService,
    CartListService,
}