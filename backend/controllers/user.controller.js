import zod, { success } from "zod";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getdatauri from "../imagefeature/datauri.js";
import cloudinary from "../imagefeature/cloudnary.js";


const usernamecheck = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
})

const Email = zod.string().email();
const password = zod.string().min(6);

export const register = async(req ,res)=>{
    try{
       const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
       }
        if(!user.firstName || !user.lastName || !user.email || !user.password){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }

        const userchk = usernamecheck.safeParse({firstName : user.firstName , lastName:user.lastName});
        const emailchk = Email.safeParse(user.email);
        const passwordchk = password.safeParse(user.password);

        if(!userchk.success){
            return res.status(400).json({
                success :true,
                message :"Invalid firstname or lastname",
            })
        }

        if(!emailchk.success){
            return res.status(400).json({
                success :false,
                message : "Enter a valid email",
            })
        }

        if(!passwordchk.success){
            return res.status(400).json({
                success:false,
                message : "Password be atleast 6 characters",
            })
        }

        const existinguserbyemail =await  User.findOne({email:user.email});

        if(existinguserbyemail){
            return res.status(400).json({
                success : false ,
                message :"Email already exist",
            })
        }

        const hashpassword = await bcrypt.hash(user.password ,10);
        await User.create({
           firstName : user.firstName,
            lastName : user.lastName,
            email:user.email,
            password :hashpassword,
        })


        return res.status(201).json({
            success : true ,
            message : "Account created successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success :false,
            message : "failed to register",
        })
    }

}

export const login = async(req ,res)=>{
    try{
        const user = {
            email : req.body.email,
            password :req.body.password,
        };
        if(!user.email || !user.password){
            return res.status(400).json({
            success :false,
            message :"All fields are required",
            })
        }

        const userfind = await User.findOne({email : user.email});
        if(!userfind){
            res.status(400).json({
                success:false,
                message : "Incorrect email or password",
            })
        }
        const isPasswordvalid =await bcrypt.compare(user.password , userfind.password);
        if(!isPasswordvalid){
            res.status(400).json({
                success:false,
                message:"Invalid credentials",
            })
        }

        const token = await  jwt.sign( {userId : userfind._id} , process.env.SECRET_KEY ,{expiresIn : "1d"});
        return res.status(200).cookie("token" , token , {maxAge : 1*24*60*60*1000 , httpOnly : true , sameSite : "strict"}).json({
            success:true,
            message : `Welcome back ${userfind.firstName}`,
        });
    }
    catch(error){
         console.log(error);
        return res.status(500).json({
            success :false,
            message : "Failed to login",
        })

    }
}


export const logout = async(req ,res)=>{
    try{
        return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
            message : "Logout successfully",
            success :true,
        })
    }
    catch(error){
        console.log(error);

    }
}

export const updateprofile = async (req ,res)=>{
try{
    const userID = req.id;
    const user = ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        bio  :  req.body.bio?.slice(1,200),
        occupation : req.body.occupation,
        instagram : req.body.instagram,
        facebook : req.body.facebook,
        linkedin : req.body.linkedin,
        github : req.body.github,
    })
    const file = req.file;
    let cloudresponse;
    if(file){
    const fileuri = getdatauri(file);

     cloudresponse= await cloudinary.uploader.upload(fileuri);
    }

    const userfind =await User.findById(userID).select("-password");
    if(!userfind){
        return res.status.json({
            message: "User not found",
            success :false,
        })
    }

    if(user.firstName) userfind.firstName = user.firstName;
    if(user.lastName) userfind.lastName = user.lastName;
    if(user.bio) userfind.bio = user.bio;
    if(user.github) userfind.github = user.github;
    if(user.instagram) userfind.instagram = user.instagram;
    if(user.linkedin) userfind.linkedin = user.linkedin;
    if(user.facebook) userfind.facebook = user.facebook;
    if(user.occupation) userfind.occupation = user.occupation;
    if(file) userfind.photoUrl = cloudresponse.secure_url;

    await userfind.save();
    return res.status(200).json({
        success : true,
        message : "profile updated succesfully",
        userfind
    })


}
catch(error){
    console.log(error);
    return res.status(401).json({
        success:false,
        message: "there is error in updating"
    })

}

}

export const me = async (req,res)=>{
    try{
    const userID = req.id;
    const userfind =await User.findById(userID);
    
    return res.json({
        success :true,
        userfind
        
    })
    }
    catch(error){
        return res.json({
            success:false,
            message : "user not found",
        })
    }
}