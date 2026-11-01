const express = require("express"); 
const URL = require("../models/url.model.js")

const router = express.Router(); 

router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allURLs = await URL.find({createdBy:req.user._id})
    return res.status(200).render("home.view.ejs",{
        allurls: allURLs
    })
});

router.get("/signup", (req, res)=>{
    return res.render("signup.view.ejs")
})

router.get("/login",(req, res)=>{
    return res.render("login.view.ejs")
})

module.exports = router;