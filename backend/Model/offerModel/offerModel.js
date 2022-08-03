const mongoose = require('mongoose')

const OfferSchema = mongoose.Schema({
    District:{
        type:String,
        required:true
    },
    OfferName:{
        type:String,
        required:true
    },
    OfferPrice:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
}
)

const Offer = mongoose.model('Offer',OfferSchema)

module.exports =  Offer;