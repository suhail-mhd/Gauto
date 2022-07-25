const mongoose = require('mongoose')

const CarModel = mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    RegNo:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    mileage:{
        type:String,
        required:true
    },
    register:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String
    },
    url:{
        type:String,
        required:true
    },
    imgName:{
        type:String,
        required:true
    },
    Longdescription:{
        type:String,
        required:true
    },
    OfferStatus:{
        type:Boolean
    },
    prevAmount:{
        type:Number
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    Bookingcount:{
        type:Number,
        default:0   
    }
},{
    timestamps: true
});


const Cars = mongoose.model('Cars',CarModel);

module.exports = Cars;