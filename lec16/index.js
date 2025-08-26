const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Blogs = require("./model/blog")
app.post("/blogs",async(req,res)=>{
    let {title,body} = req.body;
    let newBlog = new Blogs({
        title:title,
        body:body,
        date: Date.now()
    })
    await newBlog.save()
    res.json({
        success: true,
        data: newBlog,
        message: "Blog created successfully"
    });
})

app.get("/blogs",async(req,res)=>{
    let allblog = await Blogs.find();
    res.json({
        success: true,
        data: allblog
    });
})

app.get("/blogs/:id",async(req,res)=>{
    let {id} = req.params;
    let blog = await Blogs.findOne({_id: id});
    res.json({
        success: true,
        data: blog
    });
})

// app.post("/blogs",(req,res)=>{
//     let {title,body} = req.body;
//     console.log(title,body);
//     res.send("GOT IT");

//app.post("/users");
//app.get("/users");
//app.get("/users/:id");
const Users = require("./model/user")

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
    let user = await Users.findOne({_id: id});
    res.json({
        success: true,
        data: user
    });
})

app.listen(4445, function() {
    console.log('Server started on port 4445');
});

mongoose.connect('mongodb://localhost:27017/BED_DB')
    .then(()=> console.log("Connected"));