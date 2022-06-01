const express = require('express');
const env = require('./config/environment');
const app = express();
const port = 8006;
const logger = require('morgan');
const db = require('./config/mongoose');

// middle for parse form data
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// route for home
app.use('/', require('./routes/index'));
app.use(logger(env.morgan.mode, env.morgan.options));
app.listen(port,function(err){
    if(err){
        console.log(`******Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});