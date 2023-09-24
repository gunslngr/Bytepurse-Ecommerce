const express = require("express");
const session = require("express-session");
const config = require('../config/config');
const userSession = require('../middleware/userSession');
const bodyPaser = require('body-parser');
const multer = require("multer");

const userController = require("../controllers/userController");
const cartController = require('../controllers/cartController');
const orderController = require("../controllers/orderController");
const productController = require("../controllers/productController");
const wishlistController = require('../controllers/wishlistController')

const user_route = express();
user_route.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

user_route.use(bodyPaser.json());
user_route.use(bodyPaser.urlencoded({ extended: true }));

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');
user_route.use(express.static('public'));

user_route.get('/',userController.loadHome)
user_route.get('/login',userSession.isLogout,userController.login)
user_route.post('/login',userController.verifyLogin)
user_route.get('/logout',userSession.isLogin,userController.userLogout)
user_route.get('/register',userSession.isLogout,userController.register)
user_route.post('/register' , userController.insertUser);

user_route.post('/otp',userController.verifyMail);
user_route.get('/otpResend',userController.resendOtp);

user_route.get('/singleProduct',userController.loadSingleProduct);
user_route.post('/review' ,userSession.isLogin, userController.review)
user_route.post('/delete_review' ,userSession.isLogin, userController.deleteReview)
user_route.get('/shop',userController.getShop)

user_route.get('/userProfile',userSession.isLogin,userController.userProfile)
user_route.post('/updateProfile',userSession.isLogin,userController.updateProfile)
user_route.get('/address',userSession.isLogin,userController.addressForm)
user_route.post('/address',userSession.isLogin,userController.addAddress)
user_route.post('/updateAddress',userSession.isLogin,userController.updateAddress)
user_route.put('/deleteAddress',userSession.isLogin,userController.deleteAddress)
user_route.get('/resetPassword',userSession.isLogin,userController.resetPassword)
user_route.post('/resetPassword',userController.postResetPassword)
user_route.get('/forgetPassword',userSession.isLogout,userController.forgetPasswordLoad)
user_route.post('/forgetPassword',userSession.isLogout,userController.postForgetPassword)
user_route.post('/newPassword',userSession.isLogout,userController.newPassword)

user_route.get('/cart',userSession.isLogin,cartController.cartLoad)
user_route.post('/addToCart',userSession.isLogin,cartController.addToCart)
user_route.patch('/updateCart/:productId',userSession.isLogin,cartController.updateCart)
user_route.put('/deleteCart',userSession.isLogin,cartController.deleteCart)

user_route.get('/checkout',userSession.isLogin,orderController.checkoutLoad)
user_route.post('/orderAddress',userSession.isLogin,orderController.orderAddress)
user_route.post('/applyCoupon',userSession.isLogin,orderController.applyCoupon)
user_route.post('/placeOrder',userSession.isLogin,orderController.placeOrder)
user_route.get('/orderConfirm',userSession.isLogin,orderController.orderConfirm)
user_route.post('/verifyPayment',userSession.isLogin,orderController.onlineVerifyPayment)
user_route.get('/orderedList',userSession.isLogin,userController.orderedList)
user_route.get('/orderedProduct',userSession.isLogin,userController.orderedProductDetails)
user_route.patch('/cancelOrder',userSession.isLogin,userController.cancelOrder)
user_route.patch('/returnOrder',userSession.isLogin,userController.returnOrder)
user_route.get('/walletHistory',userSession.isLogin,userController.walletHistory)
user_route.post('/add-to-wallet', userSession.isLogin, userController.addToWallet);
// user_route.post( '/verify-payment', userSession.isLogin, userController.razorpayVerifyPayment )
user_route.get('/invoice',userSession.isLogin,userController.invoiceDownload)

user_route.get('/wishlist',userSession.isLogin,wishlistController.wishlistLoad)
user_route.put('/wishlist',userSession.isLogin,wishlistController.addWishlist)
user_route.patch('/deleteWishlist',userSession.isLogin,wishlistController.deleteWishlistProduct)

user_route.get('/contact',userController.contactload)
user_route.get('/about',userController.aboutload)



module.exports = user_route;