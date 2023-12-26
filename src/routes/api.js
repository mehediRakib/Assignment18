const express=require('express');
const router=express.Router();


const userController=require('../controllers/userController');
const productController=require('../controllers/ProductController');
const wishListController=require('../controllers/WishListController');
const cartListController=require('../controllers/cartListController');
const InvoiceController=require('../controllers/invoiceController');

const Authverification=require('../middleware/AuthVerification');



//user Route
router.get('/otpService/:email',userController.otpService);
router.get('/verifyOTP/:email/:otp',userController.verifyOTP);
router.post('/LogOut',Authverification,userController.LogOut);
router.post('/createProfile',Authverification,userController.createProfile);
router.post('/updateProfile',Authverification,userController.updateProfile);
router.get('/readProfile',Authverification,userController.readProfile);


//product
router.get('/ProductBrandList',productController.ProductBrandList);
router.get('/ProductCategoryList',productController.ProductCategoryList);
router.get('/SliderList',productController.SliderList);
router.get('/ProductListByBrand/:brandID',productController.productListByBrand);
router.get('/productListByCategory/:categoryID',productController.productListByCategory);
router.get('/ListByRemark/:remark',productController.ListByRemark);
router.get('/ListBySimilar/:categoryID',productController.ListBySimilar);
router.get('/productDetails/:productID',productController.productDetails);
router.get('/listByKeyWord/:keyword',productController.listByKeyWord);
router.get('/reviewList/:productId',productController.reviewList);

//WishList;
router.post('/SaveWishList',Authverification,wishListController.saveWishLsit);
router.post('/RemoveWishList',Authverification,wishListController.removeWishList);
router.get('/WishList',Authverification,wishListController.wishList);


//CartList
router.post('/SaveCartList',Authverification,cartListController.saveCartList);
router.post('/RemoveCartList',Authverification,cartListController.removeCartList);
router.get('/CartList',Authverification,cartListController.cartList);


// Invoice & Payment







module.exports=router;