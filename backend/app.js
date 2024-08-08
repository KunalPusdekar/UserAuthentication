require('dotenv').config();

const express =require('express');
const app =express();
const authRouter =require('./router/authRoute');
const databaseconnect = require('./config/databaseConfig');
const cookieParser =require('cookie-parser');
const cors =require('cors');

databaseconnect();

app.use(express.json());

app.use(cookieParser());  //using before going to the Router

//application level OR  we also give it on route level

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
//we

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
console.log('CLIENT_URL:', process.env.CLIENT_URL);

app.use('/api',authRouter);

app.use('/',(req,res)=>{
    res.status(200).json({data : 'JWTacuth server updated'});
})

module.exports =app;

