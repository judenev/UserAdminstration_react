import mongoose from "mongoose"

const adminSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required: [true,"Email is required"],
            unique:true
        },
        password:{
            type:String,
            required: [true,"Password is required"]
        },
    },
    {
        timestamps:true
    }
)
const Admin = mongoose.model("Admin",adminSchema,"admin")
export default Admin