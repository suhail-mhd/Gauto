const express = require('express')
const adminRouter = express.Router();
const {Adminlogin, userManagement, userManagementUpdate, usermanagementUpdateUnblock, AddCarRoute, deletecar, getAllCarDeatails, UpdateCarData, addDistrict, getdistrictData, deleteDistrict, adminbookingdata, completed, districtOffer, getOffer, deleteOffer, couponManagement, getCoupon, deleteCoupon } = require('../Controllers/adminController.js')


adminRouter.route('/adminlogin').post(Adminlogin)

adminRouter.route('/usermanagement').get(userManagement)

adminRouter.route('/usermanagementUpdate/:id').patch(userManagementUpdate)

adminRouter.route('/usermanagementUpdateUnblock/:id').patch(usermanagementUpdateUnblock)

adminRouter.route('/addcar').post(AddCarRoute)

adminRouter.route('/deletecar').post(deletecar)

adminRouter.route('/getallcardetails/:id').get(getAllCarDeatails)

adminRouter.route('/updatecardata').patch(UpdateCarData)

adminRouter.route('/addDistrict').post(addDistrict)

adminRouter.route('/getdistrictData').get(getdistrictData)

adminRouter.route('/deleteDistrict').post(deleteDistrict)

adminRouter.route('/adminbookingdata').get(adminbookingdata)

adminRouter.route('/completed/:id').post(completed)

adminRouter.route('/districtOffer').post(districtOffer)

adminRouter.route('/getOffer').get(getOffer)

adminRouter.route('/deleteOffer').post(deleteOffer)

adminRouter.route('/couponManagement').post(couponManagement)

adminRouter.route('/getCoupon').get(getCoupon)

adminRouter.route('/deleteCoupon/:id').post(deleteCoupon)


module.exports =  adminRouter;