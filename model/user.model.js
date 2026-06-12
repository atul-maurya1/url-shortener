import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
    },
    otp: {
        type: String,
        expiresAt: Date.now()
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minlenght: [6, "password must be 6 chars"]
        
    },
    isEmailVerified: {
			type: Boolean,
			default: false,
		},
	refreshToken: {
			type: String,
		},
})



userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
   this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function (){
     return jwt.sign(
        {
            _id: this._id,
            email: this.email

        },
         process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
     )
}

userSchema.methods.generateRefreshToken = async function (){
     return jwt.sign(
        {
            _id: this._id,
        
        },
         process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
     )
}


const User = mongoose.model("User", userSchema)
export default User