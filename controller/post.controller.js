

const Post = require('../models/post.model');
const User = require('../models/user.model');

const createPost= async (req,res)=>{
    try{
        
        const user = await User.updateOne({
            _id: req.user._id
        },
        {
            $addToSet: {
                roles: { $each: ["author"]}
            }
        })

        if(!user) return res.status(400).json({msg: "User not found and updated"});

        const post = await Post.create(req.body);

        if(!post){
            return res.status(400).json({msg: "Post not created"})
        }

        return res.status(201).json({data: post});
    }
    catch(err){
        return res.status(400).json({msg: "Post not created"})
    }
}

const getPost= async (req,res)=>{
    try{
        const posts = await Post.find({}).populate("author_id");

        if(!posts){
            return res.status(400).json({msg: "Post not found"})
        }

        return res.status(200).json({data: posts});
    }
    catch(err){
        return res.status(400).json({msg: "Post not created"})
    }
}

const deletePost= async (req,res)=>{
    try{

         const post = await Post.findOneAndDelete({ _id: req.params.post_id})
         if(!post)
         {
            return res.status(404).json({msg: "Post not found"})
         }
         return res.status(200).json({success: true})
    }
    catch(err){
        return res.status(400).json({msg: "Post not deleted"})
    }
}

const patchPost= async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "Title is required"});
         const post = await Post.updateOne({ 
            _id: req.params.post_id 
        },{
            $set: {
                title: req.body.title,
            }
        },{
            returnOriginal: false
        })
         if(!post)
         {
            return res.status(404).json({msg: "Post not found"})
         }
         return res.status(200).json({success: true})
    }
    catch(err){
        return res.status(400).json({msg: "Post not updated"})
    }
}

module.exports = {
    createPost,
    getPost,
    deletePost,
    patchPost
};