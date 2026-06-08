import mongoose, { Schema } from 'mongoose'

const urlSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      //  required: true, 
        index: true
    },
    url:{
       type: String,
       required: true,
       trim: true,
      
    },
    urlCode: {
       type: String,
       unique: true, // Prevents duplicate codes
       index: true,   // Extremely important for fast redirection
      // requried: true
    },
    shortUrl: {
      type: String,

    },
   expiresAt: Date

},{timestamps: true})

const Url = mongoose.model("Url" ,urlSchema)
export default Url