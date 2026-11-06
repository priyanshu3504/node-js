const path = require("path")
const express = require("express")
const multer = require("multer")

const PORT = 8080;
const app = express() 

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        return cb(null,"./uploads")
    },  // telling in which folder we have to save the file 
    filename: function (req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }  // by which name we have to save the file
    
})
const upload = multer({storage})  // this is middleware for file upload

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.render("homepage.ejs")
})


app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    return res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

