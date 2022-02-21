require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECT_URL, err => {
    if(err){
        console.log(err);
    }else{
        console.log('MONGO connected');
    };
});

app.listen(process.env.PORT, error => {
    if(error) console.log(error);
    console.log('Server running');
});