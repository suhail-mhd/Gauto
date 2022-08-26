const express = require('express');
const app = express();
const dbConnection = require('./db')
const cors = require('cors');
const path = require('path')
const adminRoute = require('./Routes/adminRoutes')
const userRoute = require('./Routes/userRoutes')
const dotenv = require('dotenv')




dotenv.config()

// middlewares
app.use(express.json({limit: "30mb",extended:true}))
app.use(cors())

// routes
app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)

// --------- deployment ----------

__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).send("Hellow Everybody..asdas..");
    });
} 



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

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server running on ${port}`));