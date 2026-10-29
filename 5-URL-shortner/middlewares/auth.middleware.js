const {getUser} = require("../service/auth.service.js")

function restrictToLoggedInUserOnly(req,res,next){
    // console.log(req);
    
    console.log("hello1");
    const uuid = req.cookies?.uuid;
    console.log(uuid);
    console.log("hello2");
    
    if(!uuid){
        return res.status(404).redirect("/login")
    }
    console.log("hello3");
    const user = getUser(uuid);
    
    console.log("hello4");
    // console.log(user);
    if(!user){
        return res.status(404).redirect("/login")
    }
    console.log("hello5");
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly
}