const Admin = require('../Model/AdminModel/adminModel')
const generateToken = require("../Unitl/jwt");
const asyncHandler = require("express-async-handler");
const User = require('../Model/userModel/userModel')
const AddCar = require('../Model/carModel/carModel')
const districtSchema = require('../Model/districtModel/districtModel');
const Booking = require("../Model/bookingModel/bookingModel");
const Offer = require('../Model/offerModel/offerModel');

// login route

const Adminlogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(req.body);

    const user = await Admin.findOne({ email })

    if (user && await password === user.password) {
        res.json({
            email: user.email,
            _id: user._id,
            Token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("NOT VALID")
    }
})

// user managment

const userManagement = asyncHandler(async(req,res)=>{

    // console.log("entered");
     try {
         const user = await User.find({});
         res.json(user)
     } catch (error) {
         console.log("something happend while getting all user data " , error);
     }
 })


 const userManagementUpdate = asyncHandler(async(req,res)=>{
    //  console.log(req.params.id);

     const id = req.params.id

    //  console.log(id);



     try {
         const blockData = await User.findByIdAndUpdate(id,{$set:{
            isBlock:true
         }},{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })


         res.json({
             IsBlock:blockData.isBlock,
             id:blockData._id
         })

       
     } catch (error) {
         console.log("something happend on isblock true");
     }
 })


 const usermanagementUpdateUnblock = asyncHandler(async(req,res)=>{
     const id = req.params.id;

    //  console.log(id);

     try {
        const blockData = await User.findByIdAndUpdate(id,{$set:{
           isBlock:false
        }},{
           new:true,
           runValidators:true,
           useFindAndModify:false
       })


        res.json({
            IsBlock:blockData.isBlock,
            id:blockData._id
        })

      
    } catch (error) {
        console.log("something happend on isblock true");
    }
 })

//  car management

const AddCarRoute = asyncHandler(async (req, res) => {

    const { url,brand,model,fueltype,RegNo,price,seats,location,mileage,register,description,imgUrl,imgName,Longdescription,latitude ,longitude} = req.body
  

    // console.log(Image);

    // console.log(req.body);

    // console.log("Working");

    const data = await AddCar.create({ url,brand,model,fueltype,RegNo,price,seats,location,mileage,register,description,imgUrl,imgName,latitude ,longitude,Longdescription,"OfferStatus":false,prevAmount:''})

    // console.log("00000000000000000",data);
    if (data) {
        res.status(200).json({
            id: data._id,
            brand: data.Brand,
            model: data.Model,
            fuelType: data.FuelType,
            RegNo: data.RegNo,
            Price: data.Price,
            Seats: data.Seats,
            Location: data.Location,
            Mileage: data.Mileage,
            Register: data.Register,
            Description: data.Description,
            imgUrl:data.imgUrl,
            imgName:data.imgName,
            Longdescription:data.Longdescription
        })
    } else {
        console.log("not good");
    }

})

const deletecar = asyncHandler(async(req,res)=>{
    const {deleteId}  =req.body

    console.log(deleteId);
     const dltCar = await AddCar.findById(deleteId  )
     await dltCar.remove()
     res.json({})
})

const getAllCarDeatails = asyncHandler(async(req,res)=>{
    const id = req.params.id

    try {
        const allcar = await AddCar.findById(id)
        res.json(allcar)
    } catch (error) {
        console.log("Something went wrong when we try to get all car value" , error);
    }


 })


 const UpdateCarData = asyncHandler(async(req,res)=>{

    const {id} = req.body

    // console.log(id);

    const newCarData = {
        brand :req.body.brand,
        model:req.body.model,
        fueltype:req.body.fueltype,
        location:req.body.location,
        RegNo:req.body.RegNo,
        price:req.body.price,
        seats:req.body.seats,
        mileage:req.body.mileage,
        register:req.body.register,
        description:req.body.description,
        imgUrl:req.body.imgUrl,
        Longdescription:req.body.Longdescription,
        latitude:req.body.lattitude,
        longitude:req.body.longitude
    }


    // console.log(newCarData);


    const carsData = await AddCar.findByIdAndUpdate(id,newCarData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json(carsData)

    // console.log(carsData);

 })

//  district management

const addDistrict = asyncHandler(async(req,res)=>{
    const district = req.body.district

   //  console.log(district);
   const check = await districtSchema.findOne({district}).collation( { locale: 'en', strength: 2 } )

   // console.log(check);

   if(!check){  
       const data = await districtSchema.create({district})

       if(data){

           res.status(200)
       }else{
           res.status(400).send("error while district value inserting to database")
       }
   }else{
       res.json({
           message:"data already exist"
       })
       res.status(400)

   }

   // console.log(data)
})

const getdistrictData = asyncHandler(async(req,res)=>{
    
   const getdata = await districtSchema.find({})

   if(getdata){
       res.status(200).json({
           getdata
       })
   }else{
       res.status(400).send("Error happend while getting district data from the database..")
   }

})

const deleteDistrict = asyncHandler(async(req,res)=>{
    const _id = req.body.deleteId


  try {
   const deleteData = await districtSchema.findById({_id})

   await deleteData.remove();

       res.status(200).send("district deleted")
  } catch (error) {
      res.status(400).send("error occured while deleteing data")
  }

})

// booking management

const adminbookingdata = asyncHandler(async(req,res)=>{
    

    const data = await Booking.find({})

    // console.log(data);

    if(data){
        res.status(200).json({
            data
        })
    }else{
        res.status(400).json({
            message:"something went wrong while getting whole booking data"
        })
    }

})

const completed = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Complete = {
        complete:true
    }

    const data = await Booking.findByIdAndUpdate(id,Complete,{
        new:true,
        runValidators:true,
        useFindAndModify:false
      })


      if(data){
          res.status(200).json({
              Message:"Trip Completed"
          })
      }else{
          res.status(400).json({
              message:"Something went wrong while trying to complete trip"
          })
      }
})

const districtOffer = asyncHandler(async(req,res)=>{
    const location = req.body.selectDistrict
    const offername = req.body.offerName
    const offerPrice = req.body.offerPrice

    // console.log(location , offername , offerPrice);


    const data = await Offer.create({"District":location,"OfferName":offername,"OfferPrice":offerPrice})

    const carData = await AddCar.find({"location":location}).collation( { locale: 'en', strength: 2 } )

    console.log(carData);
    carData.map(async(obj)=>{
        let amount = obj.price
         let data = amount-offerPrice
        // console.log(data);

        let offerEnable = await AddCar.updateOne({"_id":obj._id},{$set:{"OfferStatus":true,"prevAmount":amount,"price":data}},{
            new:true,
            runValidators:true,
            useFindAndModify:false
        }).collation( { locale: 'en', strength: 2 } )

        // console.log(offerEnable);

    })

   
})

const getOffer = asyncHandler(async(req,res)=>{
    

    const data = await Offer.find({})


    if(data){
        res.status(200).json({
            data
        })
    }else{
        res.status(400).json({
            message:"Something went wrong while getting offer data"
        })
    }

})


const deleteOffer = asyncHandler(async(req,res)=>{
    // console.log(req.params.id);

    const id = req.body.deleteId
    const district = req.body.deleteDistrict
    // console.log(id);
    // console.log(district);

    const carData = await AddCar.find({"location":district}).collation( { locale: 'en', strength: 2 } )

    carData.map(async(obj)=>{
        const amount = obj.prevAmount
        // console.log(amount);
        const offerDisable = await AddCar.updateOne({"_id":obj._id},{$set:{"OfferStatus":false,"price":amount,"prevAmount":0}}).collation( { locale: 'en', strength: 2 } )

        // console.log(offerDisable);
        
    })


    const offerDelete = await Offer.findById({"_id":id})
    await offerDelete.delete()
    // console.log(offerDisable);

    
    res.status(200).json({
        message:"You data have been deleted"
    })
})


module.exports = { Adminlogin, userManagement, userManagementUpdate, usermanagementUpdateUnblock, AddCarRoute, deletecar, getAllCarDeatails, UpdateCarData, addDistrict, getdistrictData, deleteDistrict, adminbookingdata, completed, districtOffer, getOffer, deleteOffer }