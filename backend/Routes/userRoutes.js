const express = require("express");
const router = express.Router()
const {RegisterUser , loginUser, otpnumber, otpvalidate, getCarData, search, lowtohigh, hightolow, getDistrict, searchdistrict, GetSingleCar, checkdate, bookingdata, razorpay, razorpaysuccess, paypal, getProfileUserData, userUpdate, passwordReset} = require('../Controllers/userController')

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

router.route('/getProfileUserData/:id').get(getProfileUserData)

router.route('/userUpdate/:id').patch(userUpdate)

router.route('/passwordReset/:id').patch(passwordReset)


module.exports = router;