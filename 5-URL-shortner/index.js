const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const connectDB = require("./db.config.js");
const url_route = require("./routes/url.route.js")
const URL = require("./models/url.model.js")

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const mongo_url = process.env.mongodb_url

const app = express();
connectDB(mongo_url);

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine", "ejs")

app.get("/test",async (req,res)=>{
    const allURLs = await URL.find({})
    return res.status(200).render("home.view.ejs",{
        urls:allURLs,
    })
})

app.use("/api/urls",url_route)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});