const mongoose = require('mongoose')

const district = mongoose.Schema({
    district:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const districtSchema = mongoose.model('districtSchema' , district);


module.exports = districtSchema;