const {getUser} = require("../service/auth.service.js")

function restrictToLoggedInUserOnly(req,res,next){

    const uuid = req.cookies?.uuid;
    
    if(!uuid){
        return res.status(404).redirect("/login")
    }

    const user = getUser(uuid);
    
    if(!user){
        return res.status(404).redirect("/login")
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const uuid = req.cookies?.uuid;
    const user = getUser(uuid);
    
    req.user = user;
    
    next();

}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}