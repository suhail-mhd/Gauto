const mongoose = require('mongoose')

const CarReview = mongoose.Schema({
    carId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    review:{
        type:String,
        require:true
    }
},
{
    timestamps:true
});


const Review = mongoose.model('Review',CarReview);


module.exports = Review;