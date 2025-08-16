import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import crypto from "node:crypto";

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, unique: true, sparse: true, default: '' },
    password: { type: String, required: true },
    profile: { type: String, default: "" },
    bio: { type: String, default: "", trim: true },


     //! ➕ forgot/reset fields
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
}, { timestamps: true }
)

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// ➕ generate reset token (store hashed in DB)
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 10 min expiry
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export const User = model('User', userSchema)