const {ProductBrandListService, ProductCategoryListService, productSliderListService, productListByBrandService,
 productListByCategoryService, listbyRemarkService, listBySimilarService, productDetailsService, listBykeyWordService,
 reviewListService
} = require("../services/productService");


exports.ProductBrandList=async (req,res)=>{
 let result=await ProductBrandListService();
 res.status(200).json(result);
}

exports.ProductCategoryList=async (req,res)=>{
 let result=await ProductCategoryListService();
 res.status(200).json(result);
}

exports.SliderList=async (req,res)=>{
 let result=await productSliderListService();
 res.status(200).json(result);
}

exports.productListByBrand=async (req,res)=>{
 let result=await productListByBrandService(req);
 res.status(200).json(result);

}

exports.productListByCategory=async (req,res)=>{
 let result=await productListByCategoryService(req);
 res.status(200).json(result);
}

exports.ListByRemark=async (req,res)=>{
 let result=await  listbyRemarkService(req);
 res.status(200).json(result);
}

exports.ListBySimilar=async (req,res)=>{
 let result=await listBySimilarService(req);
 res.status(200).json(result);
}

exports.productDetails=async (req,res)=>{
 let result=await productDetailsService(req);
 res.status(200).json(result);
}

exports.listByKeyWord=async (req,res)=>{
 let result=await listBykeyWordService(req);
 res.status(200).json(result);
}

exports.reviewList=async (req,res)=>{
 let result=await reviewListService(req);
 res.status(200).json(result);
}