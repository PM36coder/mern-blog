import { User } from "../model/userSchema.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//! registration code
const userRegister = async (req, res)=>{
 const {name, username,email,password} = req.body
 try {
    if(!name || !username || !email || !password){
        return res.status(400).json({message : "Please fill all the fields"})
    }

    const existEmail = await User.findOne({email:email})
    if(existEmail){
        return res.status(400).json({message : "Email already exists"})
    }

    const existUsername = await User.findOne({username: username})
    if(existUsername){
        return res.status(400).json({message : "Username already exists"})
    }
    //
if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
}
    const user = await User.create({name, username, email, password})

    //? JWT token code 
    const token = jwt.sign({id:user._id , name:user.name , username:user.username, email:user.email}, 
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    user.password = undefined

//* sending response and cookies 

    res.status(201).cookie("token", token,{
        httpOnly : true,
        secure: process.env.SECURE !== "development",
        maxAge : 24 * 60 * 60 * 1000,
        sameSite: process.env.SECURE === "development" ? "Lax" : "None"
    }).json({message : "Registered Successfully" , user ,token})

 } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({message : "Server Side Error" , error})
 }
}


const userLogin = async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message : "Please fill all the fields"})
    }

    try {
        //! checking the email or username is valid for login user can login with emil or username

        const user = await User.findOne({
            $or:[{email:username}, {username:username}]
        })
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if(!isMatchPassword){
            return res.status(400).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({id:user._id ,name:user.name , username:user.username, email:user.email}, 
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )
    user.password = undefined

    res.status(200).cookie("token", token,{
        httpOnly : true,
        secure: process.env.SECURE !== "development",
        maxAge : 24 * 60 * 60 * 1000, //? 1d
       sameSite: process.env.SECURE === "development" ? "Lax" : "None",
    }).json({message : "Login Successfully", user, token})

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({message : "Server Side Error", error:error.message})
        
    }
}

const userLogout = async (req, res)=>{
  try {
    res.cookie("token","",{
      maxAge: 0,
    })
    res.status(200).json({ msg: "User Logged out Successfully"})
  } catch (error) {
    res.status(500).json({ msg : 'Server Error', error: error.message})
  }
}


//! profile update 
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio, name } = req.body;
        const profile = req.file?.path;  // 🔥 FIXED: Direct assignment, not destructuring

        console.log('📝 Profile update request:', { userId, bio, name, hasImage: !!profile });

        // Validation
        if (!bio && !name && !profile) {
            return res.status(400).json({ 
                message: "At least one field (bio, name, or profile picture) is required to update" 
            });
        }

        // Find current user
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare update data
        const updateData = {};
        if (bio !== undefined) updateData.bio = bio;
        if (name !== undefined) updateData.name = name;
        if (profile) updateData.profile = profile;

        console.log('🔄 Updating user with data:', updateData);

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "Failed to update user" });
        }

        console.log('✅ Profile updated successfully for:', updatedUser.username);

        res.status(200).json({ 
            message: "Profile updated successfully", 
            user: updatedUser  // 🔧 FIXED: Changed from updateUserProfile to user
        });

    } catch (error) {
        console.error('💥 Profile update error:', error);

        // Handle specific errors
        if (error.message.includes('Only image files')) {
            return res.status(400).json({ 
                message: "Invalid file type. Please upload only JPG, JPEG, or PNG images." 
            });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: "Validation Error", 
                errors 
            });
        }

        res.status(500).json({ 
            message: "Server Error", 
            error: error.message 
        });
    }
};

//! Get user profile (Bonus function)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        console.error('💥 Get profile error:', error);
        res.status(500).json({ 
            message: "Server Error", 
            error: error.message 
        });
    }
};
export {userRegister, userLogin,userLogout,updateProfile,getUserProfile}