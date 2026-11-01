const {v4 : uuidv4} = require("uuid")

const {setUser, getUser } = require("../service/auth.service.js")
const User = require("../models/user.model.js")

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.status(201).render("home.view.ejs")

}

async function handleUserLogin (req, res){
    const {email, password} = req.body;

    const user = await User.findOne({email, password});

    if(!user){
        return res.status(404).render("login.view.ejs", {
            error: "User not found"
        })
    }
    const token = setUser(user);
    res.cookie("uuid",token)


    return res.status(200).redirect("/")
}


module.exports = {
    handleUserSignUp,
    handleUserLogin
}