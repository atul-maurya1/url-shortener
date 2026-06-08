import mongoose from 'mongoose'

const connectDB = async () => {
    try{
      
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("✅ DB connected successfully ", connection.connection.host)

    }catch(err){
        console.error(" ❌ error while connecting to DB ", err)
        process.exit(1)
    }
}

export default connectDB