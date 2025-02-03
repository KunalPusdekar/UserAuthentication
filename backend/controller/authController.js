const userModel = require('../model/userSchema');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail'); // Utility for sending emails


const signup =  async(req,res,next)=>{
    const {name,email,password, confirmPassword}=req.body;
    console.log(name,email,password,confirmPassword);

    if (!name || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Every filed is required"
        })
    }
    const validEmail =emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Please provide a valid email id"
        })
    }
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirm password does not match"
        })
    }
    try{
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Account already exists with provided email ID',
            });
        }

    const userInfo = new userModel({ name, email, password });

    //mongoose functinality
    const result= await userInfo.save();
    const token = userInfo.jwtToken();
    return res.status(200).json({
      success:true,
      data:result,
      token:token
   });
   }catch(e){
    if(e.code === 11000)  //11000 is exact code when you create exact same account
    {
        return res.status(400).json({
            success:false,
            message:'Account already exists with provided email id',
        })
    }
     return res.status(400).json({
        success:false,
        message:e.message
     })
   }
}


// const signin = async (req, res) => {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Email and password are required"
//         });
//     }

//     try {
//         console.log("Request body:", req.body);
//         const user = await userModel.findOne({ email }).select('+password'); // Include password

//         console.log("User found:", user);
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid credentials'
//             });
//         }

//         // Compare entered password with hashed password
//         console.log("Entered password:", password);
//         const hashedPassword = await bcrypt.hash(password, 12); // Hashing password with bcrypt
//         console.log(hashedPassword)

//         console.log("Stored hashed password:", user.password);
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         console.log("Password match:", passwordMatch);
//         if (!passwordMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid credentials'
//             });
//         }

//         // Generate JWT token
//         const token = user.jwtToken();
//         user.password = undefined; // Exclude password from response

//         // Set token in a cookie
//         const cookieOptions = {
//             maxAge: 24 * 60 * 60 * 1000, // 24 hours
//             httpOnly: true
//         };

//         res.cookie("token", token, cookieOptions);

//         return res.status(200).json({
//             success: true,
//             data: user
//         });
//     } catch (error) {
//         console.error("Error in signin:", error.message);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

const signin = async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"Every field is mandatory"
        })
    }
    try
    {
    const user =await userModel
     .findOne({
        email
     })
     .select('+password');

     if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({
            success: false,
            message:'Invalid creadentials'
        })
        
     }const token =user.jwtToken();
     user.password= undefined;    //to not send password to client that why this is undefined

     const cookieOption ={
        maxAge: 24 * 60 *60 * 1000,  //24hours
        httpOnly:true
     };

     res.cookie("token",token,cookieOption);
      res.status(200).json({
           success:true,
            data:user
     })
    }
    catch(error){
            res.status(400).json({
            success:false,
            message:error.message
        })
    }
}








// Get User Information function
const getUser = async (req, res, next) => {
    const userId = req.user.id; // Assumes JWT middleware attaches user ID

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

// Logout function
const logout = async (req, res, next) => {
    try {
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true
        };
        res.cookie("token", null, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

// Forgot Password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordExpiryDate = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
        const message = `Click the link to reset your password: \n\n${resetUrl}`;

        await sendEmail(user.email, 'Password Reset', message);

        return res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully'
        });
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Reset Password function
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Password and confirm password are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Password and confirm password do not match" });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await userModel.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiryDate: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        user.password=password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiryDate = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error("Error in resetPassword:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = {
    signup,
    signin,
    getUser,
    logout,
    forgotPassword,
    resetPassword
};
