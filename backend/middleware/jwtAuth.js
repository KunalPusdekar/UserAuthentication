const JWT =require('jsonwebtoken');


//"next" is important in middle to go from 1 process to other.
const jwtAuth = (req,res,next)=>{
     const token =(req.cookies && req.cookies.token) || null;

     if(!token ){
        return res.status(400).json({
            success:false,
            message:'Not authorized'
        })
     }

     try{
         const payload  = JWT.verify(token,process.env.SECRET);
         req.user ={id:payload.id , email: payload.email};
     }catch(e){
         return res.status(400).json({
            success:false,
            message:e.message
         })
     }
    next();

}




module.exports =jwtAuth;