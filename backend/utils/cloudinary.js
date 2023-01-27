import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config({ path: "./config.env" });

console.log("TESTING ",process.env.CLOUD_NAME); 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_KEY_SECRET
})

export default cloudinary; 