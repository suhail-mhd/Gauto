const express = require('express')
const adminRouter = express.Router();
const {Adminlogin, userManagement, userManagementUpdate, usermanagementUpdateUnblock, AddCarRoute, deletecar, getAllCarDeatails, UpdateCarData, addDistrict, getdistrictData, deleteDistrict} = require('../Controllers/adminController.js')


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


module.exports =  adminRouter;