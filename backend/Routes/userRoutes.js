const express = require("express");
const router = express.Router()
const protect = require( '../Middleware/authMiddleware')
const {RegisterUser , loginUser, otpnumber, otpvalidate, getCarData, search, lowtohigh, hightolow, getDistrict, searchdistrict, GetSingleCar, checkdate, bookingdata, razorpay, razorpaysuccess, paypal, getprofileuserdata, userupdate, passwordreset, getCoupon, applyCoupon, dataTowishlist, getdatafromwishlist, getallwishlistdata, removefromwishlist, completedTrips, cancelledTrips, cancel, mapBoxToken, createProductReview } = require('../Controllers/userController')

router.route('/signup').post(RegisterUser)  

router.route('/login').post(loginUser)

router.route('/otpnumber').post(otpnumber)

router.route('/otpvalidate').post(otpvalidate)

router.route('/getcarData').get(getCarData) 

router.route('/getsinglecar/:id').post(GetSingleCar)

router.route('/search').post(search)

router.route('/lowtohigh').get(lowtohigh)

router.route('/hightolow').get(hightolow)

router.route('/getDistrict').get(getDistrict)

router.route('/searchdistrict').post(searchdistrict)

router.route('/checkdate').post(checkdate)

router.route('/bookingdata').post(bookingdata)

router.route('/razorpay').post(razorpay)

router.route('/razorpaysuccess/:id').post(razorpaysuccess)

router.route('/paypal').get(paypal)

router.route('/getprofileuserdata/:id').get(getprofileuserdata)

router.route('/userupdate/:id').patch(userupdate)

router.route('/passwordreset/:id').patch(passwordreset)

router.route('/getCoupon').post(getCoupon)

router.route('/applyCoupon').post(applyCoupon)

router.route('/dataTowishlist/:id').post(dataTowishlist)

router.route('/getdatafromwishlist').post(getdatafromwishlist)

router.route('/getallwishlistdata').post(getallwishlistdata)

router.route('/removefromwishlist/:id').post(removefromwishlist)

router.route('/completedTrips').post(completedTrips)

router.route('/cancelledTrips').post(cancelledTrips)

router.route('/cancel/:id').post(cancel)

// router.route('/postingComment').post(postingComment)

// router.route('/gettingReviews').post(gettingReviews)

// router.route('/deleteComment/:id').post(deleteComment)

router.route('/mapBoxToken').get(mapBoxToken)

router.route('/:id/reviews').post(protect, createProductReview)

module.exports = router;