import jwt from "jsonwebtoken";
import { success } from "zod";


export function  verify(req ,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(200).json({
            success:false,
            message : "log out successfully"
        })
    }
    
    try{
        const verifytoken =jwt.verify(token , process.env.SECRET_KEY);
       return res.status(200).json({
            success: true ,
            message : "ok"
        })
    }
    catch(error){
       return res.status(401).json({
            success:false,
            message:"invalid token",
        })

    }

}
