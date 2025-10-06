

import cloudinary from "../imagefeature/cloudnary.js";
import getdatauri from "../imagefeature/datauri.js";
import { Blog } from "../models/blog.model.js";


export const createblog =async (req ,res)=>{
    try{
    const blog = {
        title : req.body.title,
        category : req.body.category,
    }
    if(!blog.title || !blog.category){
        return res.status(400).json({
            message : "title and category both required",
        })
    }

    const blogcreate = await Blog.create({title : blog.title , category : blog.category , author: req.id});

    res.status(200).json({
        success : true,
        blogcreate,
        message : "Blog created succesfully",
    })
}
catch(error){
    res.status(400).json({
        message : "Failed to create blog",
    })
}
}

export const updateblog = async(req ,res)=>{
    try{
        const blogId = req.params.blogId;
        const blog = {
            title : req.body.title,
            subtitle :req.body.subtitle,
            description:req.body.description,
            category : req.body.category,
        }
        const file = req.file;

        let blogfind = await Blog.findById(blogId);
        if(!blogfind){
            return res.json({
                message : "Blog not found",
            })
        }
        let thumbnail ;
        if(file){
            const filerUrl =getdatauri(file);
            thumbnail =await cloudinary.uploader.upload(filerUrl);
        }
        const updateData = {
            title : blog.title,
            subtitle: blog.subtitle ,
            description: blog.description,
            category: blog.category,
            author:req.id,
            thumbnail : thumbnail?.secure_url,
        }
            blogfind = await Blog.findByIdAndUpdate(blogId , updateData , {new:true});
            return res.status(200).json({
            success : true ,
            message : "blog updated successfully",
            blogfind
        })
    }
    catch(error){
        console.log(error);
         res.status(400).json({
            success:false,
        message : "Failed to update blog",
    })
    }
}


export const getOwnblogs = async (req ,res)=>{
    try{
        const userId = req.id;
        if(!userId){
            return res.status(400).json({
                message : "User id not found",
            })
        }
        const blogs = await Blog.find({author : userId}).populate({
            path : "author",
            select : 'firstName lastName photoUrl'
        })
        if(!blogs){
           return  res.status(400).json({
                success : false,
                blogs : [],
                message : "there no blog found",
            })
        }
        return res.status(200).json({
            success : true ,
            blogs,
        })
    }
    catch(error){
        return res.status(400).json({
            success:true,
            error : error.message
        })
    }
}


export const getownblogwithid =async(req ,res)=>{
    const id = req.params.blogid;
    if(!id){
        return res.json({
            success : false ,
            message : "There is error in fetch"
        })
    }

    const findblog =await Blog.findById(id);
    if(!findblog){
        return res.json({
            success : false,
            message : "there is no blog"
        })
    }
    return res.json({
        success : true,
        findblog
    })
}


export const deleteblog = async(req ,res)=>{
    try{
        const  blogId = req.params.id;
        const authorId = req.id;
        const blog  = await Blog.findById(blogId);
        if(!blog){
            return res.json({
                success:true,
                message : "Blog not found"
            })
        }
        if(blog.author.toString() !== authorId){
            return res.json({
                success : false,
                message : "Unauthorized to delete",
            })
        }

        await Blog.findByIdAndDelete(blogId);
        return res.json({
            success : true,
            message : "Successfully deleted"
        })

    }
    catch(error){
        return res.json({
            success:false,
            message : "Error to delete",
            error: error.message,
        })
    }
}





export const togglepublished = async (req ,res)=>{
    try{
        const {blogId} = req.params;
        const {publish} = req.query;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({
                success :false,
                message : "blog not found",
            })
        }

        blog.ispublished = !blog.ispublished;
        await blog.save();

        const statusmessage = blog.ispublished ? "Published" : "unpublished"
        return res.json({
            success:true,
            message : `Blog is ${statusmessage}`,
        })

    }
    catch(error){
        return res.json({
            message : "Failed to update"
        })
    }
}

export const allblog = async(req ,res)=>{
    const blog = await Blog.find();
    return res.json({
        blog ,
    })
}

export  const publishedbutton = async(req ,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id);

    if(blog){
        blog.ispublished = !blog.ispublished;
        await blog.save();
        return res.json({
            success : true,
            message : "published successfully"
        })
    }

    return res.json({
        success:false,
        message:"There is error in publishing blog"
    })
}

export  const removebutton = async(req ,res)=>{
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);

    if(blog){
         return res.json({
            success : true,
            message : "blog deleted succesfully"
        })
    }

    return res.json({
        success:false,
        message:"There is error in deleting the blog"
    })
}