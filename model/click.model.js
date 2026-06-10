import mongoose, { Schema } from 'mongoose'

const clickSchema = new Schema(
  {
    url: {
      type: Schema.Types.ObjectId,
      ref: "urls",
      required: true
    },

    ip: String,
    device: String,
    location: String,
    browser: String,
    
  },
  {
    timestamps: true
  }
);

const Click = mongoose.model("Click", clickSchema)
export default Click