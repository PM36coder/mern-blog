import { Schema, model } from "mongoose";
 import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name:{ type : String, required : true},
    username: {type: String, required : true, unique : true, lowercase : true},
    email : {type : String, required: true, unique: true ,trim : true},
    password : {type: String, required : true},
    profile : {type : String ,default : ""},
    bio: { type: String, default: "", trim: true },
}, {timestamps : true}
 )


userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next()

        try {
             const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
        } catch (error) {
            next(error)
        }
       
})

export const User = model('User', userSchema)