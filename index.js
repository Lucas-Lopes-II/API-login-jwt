require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const mongoose = require('mongoose');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

mongoose.connect(process.env.MONGO_CONNECT_URL, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('MONGO connected');
    };
});

app.use('/user', express.json(), userRouter);
app.use('/admin', express.json(), adminRouter);

app.listen(process.env.PORT, error => {
    if (error) console.log(error);
    console.log('Server running');
});