 const BrandModel=require('../model/BrandModel');
const categoryModel=require('../model/CategoryModel')
 const sliderModel=require('../model/ProductSliderModel');
const productModel=require('../model/ProductModel');
const reviewModel=require('../model/ReviewModel');
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

const ProductBrandListService=async () => {
  try{
      let data = await BrandModel.find();
      return {status:"success",data:data};
  }catch (e) {
      return {status:"fail",data:e.toString()};
  }
}

const ProductCategoryListService=async () => {
    try {
        let data = await categoryModel.find();
        return {status:"success",data:data};


    } catch (e) {
        return {status:"success",data:e.toString()};
    }

}

const productSliderListService=async ()=>{
   try{
       let data=await sliderModel.find();
       return {status:"success",data:data};
   }catch (e) {
       return {status:"fail",data:e.toString()};
   }
}

const productListByBrandService=async (req)=>{
   try{
       let brandID=new ObjectId(req.params.brandID);

       let matchStage={$match:{brandID: brandID}};
       let joinWithBrand={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
       let UnwindBrandStage={$unwind:"$brand"}

       let joinWithCategory={$lookup: {from:"categories",localField: "categoryID",foreignField: '_id',as:"category"}};
       let UnwindCategoryStage={$unwind:"$category"};

       let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}
       let data=await productModel.aggregate([
           matchStage,
           joinWithBrand,
           UnwindBrandStage,
           joinWithCategory,
           UnwindCategoryStage,
           ProjectionStage,

       ])
       return{status:"success",data:data};
   }
   catch (e) {
       return {status:"fail",data:e.toString()};
   }

}

const productListByCategoryService=async (req)=>{
    try{
        let categoryID=new ObjectId(req.params.categoryID);
        let matchStage={$match:{categoryID: categoryID}};
        let joinWithBrand={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let UnwindBrandStage={$unwind:"$brand"}

        let joinWithCategory={$lookup: {from:"categories",localField: "categoryID",foreignField: '_id',as:"category"}};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}
        let data=await productModel.aggregate([
            matchStage,
            joinWithBrand,
            UnwindBrandStage,
            joinWithCategory,
            UnwindCategoryStage,
            ProjectionStage,

        ])
        return{status:"success",data:data};
    }
    catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

const listbyRemarkService=async (req)=>{
    try{
        const remark=req.params.remark;
        let matchStage={$match:{remark:remark}};

        let BrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let UnwindBrandStage={$unwind:"$brand"};

        let categoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data=await productModel.aggregate([
            matchStage,
            BrandStage,
            UnwindBrandStage,
            categoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:'success',data:data};
    }catch (e) {
       return {status:"fail",data:e.toString()};
    }

}

const listBySimilarService=async (req)=>{
    try{
        const categoryID=new ObjectId(req.params.categoryID);
        let limitStage={$limit:20};
        let matchStage={$match:{categoryID:categoryID}};

        let BrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let UnwindBrandStage={$unwind:"$brand"};

        let categoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data=await productModel.aggregate([
            limitStage,
            matchStage,
            BrandStage,
            UnwindBrandStage,
            categoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:'success',data:data};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }


}

const productDetailsService=async (req)=> {
    try {
        let productID = new ObjectId(req.params.productID);
        let matchStage = {$match: {_id: productID}};

        let BrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let UnwindBrandStage = {$unwind: "$brand"};

        let categoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let UnwindCategoryStage = {$unwind: "$category"};

        let detailsStage = {
            $lookup: {
                from: 'productDetails',
                localField: "_id",
                foreignField: "productID",
                as: "Details"
            }
        };
        let unwindDetailsStage = {$unwind: "$Details"};

        let ProjectionStage = {$project: {'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0}}

        let data = await productModel.aggregate([
            matchStage,
            BrandStage,
            UnwindBrandStage,
            categoryStage,
            UnwindCategoryStage,
            ProjectionStage,
            detailsStage,
            unwindDetailsStage,
        ])
        return {status: 'success', data: data};
    } catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}


    const listBykeyWordService=async (req)=>{

    try{
        let searchRegex={$regex:req.params.keyword,"$options":"i"};
        let searchParams=[{title:searchRegex,shortDes:searchRegex}];
        let searchQuery={$or:searchParams};

        let MatchStage={$match:searchQuery};


        let BrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let UnwindBrandStage={$unwind:"$brand"};

        let categoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage={$unwind:"$category"};


        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};

        let data=await productModel.aggregate([
            MatchStage,
            BrandStage,
            UnwindBrandStage,
            categoryStage,
            UnwindCategoryStage,
            ProjectionStage,
        ])
        return {status:'success',data:data};

    }catch (e) {
        return {status:'fail',data:e.toString()};
    }

}

const reviewListService=async (req)=>{
  try{
      let productId=new ObjectId(req.params.productId);
      let matchStage={$match:{productID:productId}};
      let profileStage={
          $lookup:{
              from:"profiles",
              localField:"userID",
              foreignField:"_id",
              as:"profile",
          }
      }
      let unwindprofileStage={$unwind:"$profile"};

      let data=await reviewModel.aggregate([
          matchStage,
          profileStage,
          unwindprofileStage,
      ])
      return {status:"success",data:data};
  }catch (e) {
      return {status:"fail",data:e.toString()};
  }


}

module.exports={
    ProductCategoryListService,
    ProductBrandListService,
    productSliderListService,
    productListByBrandService,
    productListByCategoryService,
    listbyRemarkService,
    listBySimilarService,
    productDetailsService,
    listBykeyWordService,
    reviewListService

}