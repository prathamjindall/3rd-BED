const express = require('express');
const app = express();
const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const Blogs=require('./model/blog')

const Users = require("./model/user");
const user = require('./model/user');

//Middleware to verify JWT 
const isLogin = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token provided"
            });
        }

        // token
        token = token.split(" ")[1];  
        let decode = jwt.verify(token, "okkkk");  
        req.userId = decode.userId;  
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        });
    }
};

//blog routes
app.post("/blogs", isLogin, async(req,res)=>{
    let {title,body} = req.body;
    let userExist=await user.findById(req.userId);
    if(userExist){
        let newBlog=new Blogs({
        title:title,
        body:body,
        date:Date.now(),
        userId:req.userId
    })
    await newBlog.save()
    userExist.blogs.push(newBlog._id);
    await userExist.save();
    res.json({
        success:true,
        data:newBlog,
        message:"blog added successfully"
    })
    }
})

app.get("/blogs", async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    })
})

app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params;
    let blog=await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })

})

//User Routes
app.post("/users",async(req,res)=>{
    let {email,username,password} = req.body;
    let newUser = new Users({
        email:email,
        username:username,
        password:password
    })
    await newUser.save()
    res.json({
        success: true,
        data: newUser,
        message: "User created successfully"
    });
})

app.get("/users",async(req,res)=>{
    let allUsers = await Users.find();
    res.json({
        success: true,
        data: allUsers
    });
})

app.get("/users/:id",async(req,res)=>{
    let {id} = req.params;
    let userExist = await Users.findOne({_id: id}).populate("blogs");
    if(userExist){
        res.json({
        success: true,
        data: userExist
    });
    }
})

//Login Route
app.post("/login", async (req,res)=>{
    let {email, password} = req.body;
    let userExist = await Users.findOne({email:email});
    if(!userExist){
        return res.json({
            success:false,
            message:"User not found"
        })
    }
    if(userExist.password !== password){
        return res.json({
            success:false,
            message:"Invalid credentials"
        })
    }
    let token = jwt.sign({userId: userExist._id}, "okkkk", {expiresIn: "1h"});
    return res.json({
        success:true,
        message:"Login successful",
        token:token
    })
})

//Delete Blog
app.delete("/blogs/:blogId",async(req,res)=>{
    let {blogId} = req.params;
    let {userId} = req.body;
    let blogExist = await Blogs.findById(blogId);
    if(!blogExist){
        res.json({
            success:false,
            message:"Blog not found"
        })
    }if(blogExist.userId != userId){
            res.json({
                success:false,
                message:"You are not authorized to delete this blog"
            })
    }

    await Blogs.findByIdAndDelete(blogId);
    let userExist = await user.findById(userId);
    let blog = userExist.blogs.filter((id)=>id!=blogId);
    userExist.blogs = blog;
    await userExist.save();
    res.json({
        success:true,
        message:"Blog deleted successfully",
        data: userExist
    })
})

//Update Blog
app.put("/blogs/:blogId",async (req,res)=>{
    let {blogId} = req.params;
    let {title,body} = req.body;
    let blog = await Blogs.findById(blogId);
    if(!blog){
        return res.json({
            success:false,
            message:"Blog not found"
        })
    }
    if(blog.userId != req.body.userId){
        return res.json({
            success:false,
            message:"You are not authorized to update this blog"
        })
    }
    blog.title = title;
    blog.body = body;
    await blog.save();
    res.json({
        success:true,
        message:"Blog updated successfully",
        data:blog
    })
})

app.listen(4445, function() {
    console.log('Server started on port 4445');
});

mongoose.connect('mongodb://localhost:27017/BED_DB')
    .then(()=> console.log("Connected"));