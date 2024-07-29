const express = require('express');
const { signup, logout } =require('../controller/authController');
const { signin } =require('../controller/authController');
const { getUser } =require('../controller/authController');

const jwtAuth =require('../middleware/jwtAuth');
const authRouter =express.Router();

authRouter.post('/signup',signup);   //post for creating  or accessing the data.
                                   //having path and cotrolle

authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth,getUser);
authRouter.get('/logout',jwtAuth,logout);  //jwtAuth for insuring that user first have  account then it will logout


module.exports= authRouter;                                

