const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const connectDB = require("./db.config.js");
const URL = require("./models/url.model.js")
const {restrictToLoggedInUserOnly} = require("./middlewares/auth.middleware.js")

// all routes
const urlRoute = require("./routes/url.route.js")
const static_route = require("./routes/staticRouter.js")
const userRoute = require("./routes/user.route.js")

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const mongo_url = process.env.mongodb_url

const app = express();
connectDB(mongo_url);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.set("view engine", "ejs")



app.use("/api/urls",restrictToLoggedInUserOnly,urlRoute)
app.use("/users",userRoute)
app.use("/",static_route)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});