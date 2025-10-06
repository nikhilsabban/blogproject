import express from "express";
const app =express();
import dotenv from "dotenv";
import connectdb from "./database/db.js";
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

app.use(cookieParser());

app.use(cors({
  origin: true,
  credentials: true
}));

dotenv.config();
const PORT = process.env.PORT || 3000 ;
const _dirname =path.resolve();


app.use(express.json());
app.use("/api/v1/user" , userRoute);
app.use("/api/v1/blog" , blogRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("/" , (req ,res)=>{
  res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"));
});

app.listen(PORT , ()=>{
    connectdb();
    console.log(`App running on port number on ${PORT} `);
})