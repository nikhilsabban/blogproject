import mongoose from "mongoose";
const connectdb = async()=>{{
try{
await mongoose.connect(process.env.MONGO_URI)
console.log("mongodb got connected");
}
catch(error){
console.log("mongodb connection error" ,error);
}
}}

export default connectdb;