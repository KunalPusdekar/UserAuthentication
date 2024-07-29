require ('dotenv').config()
const PORT = process.env.PORT || 5001;

const { default: mongoose } = require('mongoose');
const app =require('./app');

app.listen(PORT,()=>{
    console.log(`Server is listening the port ${PORT}`);
})