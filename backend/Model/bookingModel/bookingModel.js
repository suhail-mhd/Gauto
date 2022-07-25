const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    carId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    carname:{
        type:String,
        required:true
    },
    cancel:{
        type:Boolean,
        required:true
    },
    complete:{
        type:Boolean,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    PayedAmount:{
        type:Number,
        required:true
    }
},
{
    timestamps: true
}
)

const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking;