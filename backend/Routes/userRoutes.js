const express = require("express");
const router = express.Router()
const {RegisterUser , loginUser, otpnumber, otpvalidate, getCarData, search, lowtohigh, hightolow, getdistrict, searchdistrict, GetSingleCar, checkdate, bookingdata, razorpay, razorpaysuccess} = require('../Controllers/userController')

router.route('/signup').post(RegisterUser)  

router.route('/login').post(loginUser)

router.route('/otpnumber').post(otpnumber)

router.route('/otpvalidate').post(otpvalidate)

router.route('/getcarData').get(getCarData) 

router.route('/getsinglecar/:id').post(GetSingleCar)

router.route('/search').post(search)

router.route('/lowtohigh').get(lowtohigh)

router.route('/hightolow').get(hightolow)

router.route('/getdistrict').get(getdistrict)

router.route('/searchdistrict').post(searchdistrict)

router.route('/checkdate').post(checkdate)

router.route('/bookingdata').post(bookingdata)

router.route('/razorpay').post(razorpay)

router.route('/razorpaysuccess/:id').post(razorpaysuccess)


module.exports = router;