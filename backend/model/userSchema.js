const mongoose =require('mongoose')
const JWT =require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Schema} =mongoose;
const userSchema = new Schema({
  name:{
    type:String,
    required:[true,'User name is Required'],   //3rd level validation before that we can validate that things in react , or after that controller
    minLength:[5,'Name must be at least 5 char'],
    maxLength:[50,'Name must be less than 50 char'],
    trim:true,
  },
  email:{
    type:String,
    required:[true,'User email is Required'], 
    unique:true,
    lowercase:true,
    unique:[true,'already registered'],
  },
  password:{
    type:String,
    select:false,
    required:[true,'User password is Required'],  

  },
  forgotPasswordToken:{
    type :String,     
  },
  forgotPasswordExpiryDate:{
    type:Date,
  }
  
},
{
   timestamps:true, 
});


//custom middleware
userSchema.pre('save',async function(next){
   if(!this.isModified('password')){
    return next();
   }
   this.password =await bcrypt.hash(this.password,10);
   return next();
})
userSchema.methods ={
  jwtToken(){
    return JWT.sign(
      //data
      {id:this._id,email: this.email},
      //secret key
      process.env.SECRET,
      { expiresIn:'24h'}
      )
  }
}

const userModel =mongoose.model('user',userSchema);
module.exports =userModel ;

