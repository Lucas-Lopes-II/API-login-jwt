require('dotenv').config();
const express = require('express');
const app = express();


app.listen(process.env.PORT, error => {
    if(error) console.log(error);
    console.log('Server running');
});