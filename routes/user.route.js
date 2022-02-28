
const express= require('express');
const router = express.Router();

const authenticated = require("../middlewares/authenticated");


router.get("/", authenticated, (req,res)=>{
    
    console.log(req.user);
    return res.status(200).json({data: req.user});
})


module.exports = router;