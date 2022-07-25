const User = require("../Model/userModel/userModel");
const asyncHandler = require("express-async-handler");
require('dotenv').config()
const generateToken = require("../Unitl/jwt");
const Razorpay = require('razorpay')
const shortid = require("shortid");
var nodemailer = require('nodemailer');
const AddCar = require('../Model/carModel/carModel')
const districtSchema = require('../Model/districtModel/districtModel')
const Booking = require("../Model/bookingModel/bookingModel");

var instance = new Razorpay({ key_id: process.env.RAZKEYID , key_secret: process.env.RAZSECRETKEY})

const serviceSID =  process.env.SERVICESID
const AccountSID = process.env.ACCOUNTSID
const AuthTOKEN  = process.env.AUTHTOKEN
const client = require('twilio')(AccountSID,AuthTOKEN)
const bcrypt = require("bcrypt");


//user register

const RegisterUser = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      age,
      gender,
      address,
      district,
      password,
    } = req.body;
  
    const UserExist = await User.findOne({ email });
  
    if (UserExist) {
      res.status(400);
      throw new Error("User Already Exist");
    }
  
    const user = await User.create({
      name,
      email,
      phone,
      age,
      gender,
      address,
      district,
      password,
      isBlock:false,
    });
    // console.log(req.body);
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        address: user.address,
        district: user.district,
        isBlock:user.isBlock,
        Token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("error occured");
    }
  });
  
  //user login
  
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    
    const user = await User.findOne({ email });
    
    if(user.isBlock){
      res.status(400)
      res.json({
        iserror:"ADMIN IS BLOCKED THIS USER"
      })
  
      
    }else{
  
    
  
    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        email: user.email,
        isBlock:user.isBlock,
        name: user.name,
        IsBlock:user.isBlock,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Email OR Password Not matching");
    }
  }
  });

  // otp number entering and sending otp

const otpnumber = asyncHandler(async(req,res)=>{

  console.log(req.body.mobNumber);

  const phone = req.body.mobNumber
  // console.log(phone);

  const data = await User.findOne({phone})

  if(data){
    client.verify.services(serviceSID).verifications.create({
      to:`+91${phone}`,
      channel:"sms"
    })
    
  }else{
    console.log("not founded");
    res.status(400)
    throw new Error("Mobile Number not exist")
  }


})



const otpvalidate = asyncHandler(async(req,res)=>{
  const otp = req.body.otp
  const phone = req.body.mobNumber
  // console.log(phone);
  console.log(otp);


  const data = await User.findOne({phone})

  // console.log(data);

  try {
    client.verify.services(serviceSID).verificationChecks.create({
      to:`+91${phone}`,
      code:otp
    }).then((response)=>{
      console.log(response);

    res.json({
      _id: data._id,
      email: data.email,
      isBlock:data.isBlock,
      name: data.name,
      IsBlock:data.isBlock,
      token: generateToken(data._id),
      res:response
    });
    })


    res.status(200)
  } catch (error) {
    res.status(400)
      console.log("error occured in the otp validation",error);
  }
})

// car data

const getCarData = asyncHandler(async(req,res)=>{
  try {
    const data = await AddCar.find({})
    res.json({
      data
    })
  } catch (error) {
    console.log(error);
  }
})

// search data

const search = asyncHandler(async(req,res)=>{
  // console.log(req.body.searchText);

  const brand = req.body.searchText

  const data = await AddCar.find({"brand":brand}).collation( { locale: 'en', strength: 2 } )

    if(data){
      res.status(200).json({
        data
      })
    }else{
      console.log("error occured while serching car");
    }
})

// filter by price

const lowtohigh = asyncHandler(async(req,res)=>{

  const sort = await AddCar.find({}).sort({"price":1})

  // console.log(sort);

  if(sort){
    res.status(200).json({
      sort
    })
  }else{
    res.status(400)
    console.log("error occured while sorting low to hign");
  }
})

const hightolow = asyncHandler(async(req,res)=>{
    const sorttwo  = await AddCar.find({}).sort({"price":-1})

    // console.log(sorttwo);


    if(sorttwo){
      res.status(200).json({
        sorttwo
      })
    }else{
      res.status(400)
      res.send("Error occured while sorting data in high to low")
    }
})

// filter by district

const getdistrict =  asyncHandler(async(req,res)=>{

  const Getdistrict = await districtSchema.find({})

//  console.log(Getdistrict);

  if(Getdistrict){
    res.status(200).json({
      Getdistrict
    })
  }else{
    res.status(400).json({
      message:"District Not Found!"
    })
  }

})


const searchdistrict = asyncHandler(async(req,res)=>{
  const location = req.body.place

  console.log(location);

  const data = await AddCar.find({"location":location}).collation( { locale: 'en', strength: 2 } )


    if(data){
      res.status(200).json({
        data
      })
    }else{
      res.status(400).json({
        message:"No Data is there"
      })
    }

  console.log(data);
})

// single car details

const GetSingleCar = asyncHandler(async(req,res)=>{

  const id = req.params.id

  // console.log(id);

  const carData = await AddCar.findById(id)

  // console.log(carData);

  if(carData){
    res.status(200)
    res.json(carData)
  }else{
    res.json(400)
    res.send("Error happend when we try take a single car from the database..")
  }

})

// pick date for booking

const checkdate = asyncHandler(async(req,res)=>{
  // console.log(req.body.val);
  // console.log(req.body.val2);
  const carId = req.body.id
  const startDate= req.body.val;
  const EndDate = req.body.val2;

  const DateCheck = await Booking.find({"carId":carId,"startDate":startDate,"endDate":EndDate})

  console.log(DateCheck);

  if(DateCheck.length<1){
    res.status(200).json({
      message:"Car Available"
    })
  }else if(DateCheck.length>0){
    res.json({
      message:"Car Not Available For this Time Period"
    })
  }else{
    console.log("No Date");
  }
})

// booking

const bookingdata = asyncHandler(async(req,res)=>{
  // console.log(req.body.userId);

  const userId = req.body.userId

  const bookingData = await Booking.find({"userId":userId,"cancel":false,"complete":false})

  // console.log(bookingData);


  if(bookingData){
    res.status(200).json({
      bookingData
    })
  }else{
    res.status(400).json({
      message:"Error while fetching booking history"
    })
  }

})

// payment integration

const razorpay = asyncHandler(async(req,res)=>{
  const payment_capture = -1;
  const amount = 500;
  const currency = "INR";

  const option = {
    amount,
    currency,
    receipt:shortid.generate(),
    payment_capture,
  };


  try {
    const response = await instance.orders.create(option)
    console.log(response);
    res.status(200).json({
      id:response.id,
      currency:response.currency,
    })
  } catch (error) {
    console.log(error);
  }
})

const razorpaysuccess = asyncHandler(async(req,res)=>{
  // console.log(req.body);

  // console.log("enterd");

  const couponId = req.body.couponId;
  const couponCode = req.body.couponCode;
  const startData = req.body.start;
  const endData = req.body.end;
  const userId = req.body.USERID;
  const userName = req.body.USERNAME;
  const carName = req.body.carName;
  const amount = req.body.amount
  const carId = req.params.id
  const useremail = req.body.USEREMAIL
  // console.log(couponId , couponCode , userId );
  // console.log(startData , endData , userId , userName , carName , carId , amount);

try {
  
  if(couponId && couponCode ){
    const couponstore = await AppliedCoupon.create({'UserId':userId,'CouponCode':couponCode})
  }
  // console.log(couponstore);


  const BookingStore = await Booking.create({'carId':carId,'userId':userId,'username':userName,'carname':carName,'cancel':false,'complete':false,'startDate':startData,'endDate':endData,'PayedAmount':amount})

    console.log(BookingStore);


  // if(IncCount){
  //   const UpdateCount = await AddCar.updateOne()

  //   console.log(UpdateCount);
  // }

  // console.log(IncCount);
  if(BookingStore){
    const IncCount = await AddCar.findOneAndUpdate({"_id":carId},{$inc:{Bookingcount:1}})


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: 'gautopvt@gmail.com',
      to: useremail,
      subject: "Gauto Car Rental Booking Service",
      text: `Hello ${userName} Thank you for using Gauto for your personal car rental service . Your have successfully booked ${carName} from our website . You can use the car from ${startData} to ${endData} Thank You For using Gauto Car Rental pvt and have a great day!!`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
       
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Email sented")
      }
    });
  }

  res.status(200).json({
    message:"Successfully Booked"
  })
} catch (error) {
  res.status(400).json({
    message:"Something wrong happend when we try to book.."
  })
}
  // console.log(BookingStore);

})


  module.exports = {RegisterUser, loginUser, otpnumber, otpvalidate, getCarData, search, lowtohigh, hightolow, getdistrict, searchdistrict, GetSingleCar, checkdate, bookingdata, razorpay, razorpaysuccess}