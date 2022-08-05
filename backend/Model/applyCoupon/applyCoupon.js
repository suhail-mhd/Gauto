const mongoose = require('mongoose')

const applyCoupon = mongoose.Schema({
    UserId:{
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

const appliedCoupon = mongoose.model('AppliedCoupon',applyCoupon);

module.exports = appliedCoupon;