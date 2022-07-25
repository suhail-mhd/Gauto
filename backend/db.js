const mongoose = require('mongoose');
require('dotenv').config()

function connectDB(){
    mongoose.connect( process.env.DB, {useUnifiedTopology:true, useNewUrlParser:true})

    const connection = mongoose.connection

    connection.on('connected', () => {
        console.log('DB connected');
    })

    connection.on('error', ()=>{
        console.log('DB error');
    })
}

connectDB()

module.exports = mongoose