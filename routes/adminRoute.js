const express = require("express");
const user_route=require('../routes/userRoute')
const session = require("express-session");
const config = require("../config/config");
const multer = require("multer");
const path = require("path");

const bannerController = require('../controllers/bannerController')
const categoryController=require("../controllers/categoryController")
const adminSession =require("../middleware/adminSession");
const adminController = require('../controllers/adminController');
const productController = require("../controllers/productController")
const couponController = require("../controllers/couponController")
const upload = require("../middleware/uploadImages")

user_route.use(express.static('public'));
const admin_route = express();

admin_route.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

const bodyPaser = require("body-parser");

admin_route.use(bodyPaser.json());
admin_route.use(bodyPaser.urlencoded({ extended: true }));

admin_route.set('view engine', 'ejs');
admin_route.set('views', './views/admin'); 




admin_route.get('/',adminSession.isLogout, adminController.loadLogin);

admin_route.post('/', (req, res) => {
    adminController.verifyLogin(req, res, req.body);
  });


admin_route.get('/logout',adminSession.isLogin,adminController.logout);

admin_route.get('/dashboard',adminController.adminDashboard);
admin_route.get('/usersList',adminSession.isLogin,adminController.usersList);
admin_route.get('/blockUser',adminSession.isLogin,adminController.blockUser);

admin_route.get('/viewCategory',adminSession.isLogin,categoryController.viewCategory)
admin_route.post('/addCategory',adminSession.isLogin,categoryController.addCategory)
admin_route.get('/editCategory',adminSession.isLogin,categoryController.editCategory)
admin_route.post('/editCategory',adminSession.isLogin,categoryController.updateCategory)
admin_route.get('/unlistCategory',adminSession.isLogin,categoryController.unlistCategory)

admin_route.get('/viewProduct',adminSession.isLogin,productController.viewProduct)
admin_route.get('/addProduct',adminSession.isLogin,productController.addProductLoad)
admin_route.post('/addProduct',adminSession.isLogin,upload.upload.array('image',5),productController.postProduct)
admin_route.get('/editProduct',adminSession.isLogin,productController.editProduct)
admin_route.post('/editProduct',adminSession.isLogin,upload.upload.array('image',5),productController.updateProduct)
admin_route.get('/unlistProduct',adminSession.isLogin,productController.unlistProduct)
admin_route.put('/deleteImage',adminSession.isLogin,productController.deleteImage)

admin_route.get('/orderList',adminSession.isLogin,adminController.orderList)
admin_route.get('/orderDetails',adminSession.isLogin,adminController.orderDetails)
admin_route.patch('/updateStatus',adminSession.isLogin,adminController.updateStatus)
admin_route.patch('/updatedDate',adminSession.isLogin,adminController.updateDeliveryDate)
admin_route.put('/cancelOrder',adminSession.isLogin,adminController.cancelOrder)

admin_route.get('/bannerList',adminSession.isLogin,bannerController.bannerList)
admin_route.get('/addBanner',adminSession.isLogin,bannerController.addBannerLoad)
admin_route.post('/addBanner',adminSession.isLogin,upload.bannerUpoload.array('image',5),bannerController.postAddBanner)
admin_route.get('/editBanner',adminSession.isLogin,bannerController.editBanner)
admin_route.post('/editBanner',adminSession.isLogin,upload.bannerUpoload.array('image',5),bannerController.postEditBanner)
admin_route.put('/deleteBannerImage',adminSession.isLogin,bannerController.deleteBannerImage)
admin_route.get('/unlistBanner',adminSession.isLogin,bannerController.unlistBanner)

admin_route.get('/couponList',adminSession.isLogin,couponController.couponList)
admin_route.get('/addCoupon',adminSession.isLogin,couponController.getAddCoupon)
admin_route.post('/addCoupon',adminSession.isLogin,couponController.postAddCoupon)
admin_route.get('/editCoupon',adminSession.isLogin,couponController.editCoupon)
admin_route.post('/editCoupon',adminSession.isLogin,couponController.updateCoupon)
admin_route.get('/deleteCoupon',adminSession.isLogin,couponController.deleteCoupon)

admin_route.get("/salesReport",adminSession.isLogin,adminController.salesReportLoad)
admin_route.post('/salesReport',adminSession.isLogin,adminController.datewiseReport)

module.exports = admin_route;
