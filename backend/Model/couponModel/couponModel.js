const mongoose = require('mongoose')

const coupon = mongoose.Schema({
    couponName:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    CouponCode:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const couponModel = mongoose.model('CouponModel',coupon);

module.exports = couponModel;