const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const dbConnection = require('./db')
require('dotenv').config()
const cors = require('cors');
const adminRoute = require('./Routes/adminRoutes')
const userRoute = require('./Routes/userRoutes')


//errror handling
const notFound  = (req,res,next)=>{
    const error  = new Error("Not Found");
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next) => {
    console.error(err);
    const statusCode =  res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message
    })
};

// middlewares
app.use(express.json({limit: "30mb",extended:true}))
app.use(cors())

// routes
app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).send("Hellow Everybody..asdas..");
    });
} 

app.use(notFound);
app.use(errorHandler);

app.listen(5000,()=>console.log(`Server running on ${port}`));