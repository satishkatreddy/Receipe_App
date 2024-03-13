const express = require('express');
const mongoose = require('mongoose');
const {config}= require('dotenv');
const connectDataBase =require('./utils/database');
const userRouter = require('./routers/user');
const reciepeRouter = require('./routers/reciepe');
const app = express();


config({
    path: "./config.env"
 })

//middleware
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/reciepe', reciepeRouter);

//DATABASE
connectDataBase()


const PORT = 5500;
app.listen(PORT, (err)=>{

    if(err){
        console.log(err);
    }
    else{
        console.log(`server is connected on ${PORT}`);
    }
})
