const http = require("node:http")
const fs  = require("node:fs")
require("dotenv").config()

const FILENAME = "log.txt"
const PORT = process.env.PORT || 8080;
const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()} : ${req.url}\n`;
    
    if (req.url !== "/favicon.ico"){
        fs.appendFile(FILENAME,log,(err)=>{
        if(err){
            console.log(`Error : ${err}`);
            return;
        }
    })

    }

    switch(req.url){
        case "/":
            res.end("Home page");
            break;
        case "/about":
            res.end("Hey! I am Priyanshu Lakwal");
            break;
        case "/contact-us":
            res.end("instaID : lakwalPriyanshu");
            break;
        default:
            res.end("Invalid request : Error 404");
    }
    

})

myServer.listen(PORT , ()=>{
    console.log(`Server is running on the http://localhost:${PORT}`);
    
})