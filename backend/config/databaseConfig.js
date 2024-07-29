// const mongoose =require('mongoose');

// const MONGODB_URL= process.env.MONGODB_URL ;

// const databaseconnect =() =>{
//     mongoose
//     .connect(MONGODB_URL)
//     .then((conn)=>console.log(`Connected to DB: ${conn.connection.host}`))
//     .catch((err)=>console.log(err.message));
// }

// module.exports=databaseconnect;
const mongoose =require('mongoose');
const port =3010;

const databaseconnect =async ()=>{
    
    mongoose.connect(process.env.MONGO_URI)
    .then((conn)=>{
       console.log(`Connected to DB : ${conn.connection.host}`);
    })
    .catch((e)=>{
        console.error("ERROR : ",e);
        process.exit(1);
    });
}

module.exports = databaseconnect;
