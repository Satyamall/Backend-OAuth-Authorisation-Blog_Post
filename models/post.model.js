
const mongoose  = require("mongoose");

//Schema
const PostSchema= new mongoose.Schema({
   title: {type: String},
   author_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "oauthusers",
       required: true
   }
   }
    ,
    { timestamps: true}
)

//Models
const Post = mongoose.model("blogposts",PostSchema);

module.exports=Post;