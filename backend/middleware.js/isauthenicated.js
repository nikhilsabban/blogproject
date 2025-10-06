import jwt from "jsonwebtoken";
import { success } from "zod";


export const isauthenicated =async(req ,res , next)=>{

    try{
        const token = req.cookies.token ;
        if(!token){
            return res.status(401).json({
                success:false,
                message : "user not authenicated",
            })
        }
        const decode = jwt.verify(token , process.env.SECRET_KEY);

        if(!decode){
            return res.json({
                success:false,
                message : "user not authenicated",
            })
        }

        req.id = decode.userId,
        next();

    }
    catch(error){
        console.log(error);

    }
}