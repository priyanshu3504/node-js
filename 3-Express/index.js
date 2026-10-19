// why express ?
// 0. In http.createServer() -- this takes a callback function (handler function) which handle different routes and different methods
// 1. make a case for each route and in each case we also have to handle different http methods
// 2. makes routing easy for us
// 3. no need of url package if we are working with express

// const http = require("node:http");
// const fs = require("node:fs");

const express = require("express");
require("dotenv").config();

const FILENAME = "log.txt";
const PORT = process.env.PORT || 8080;

const app = express(); // this app is a myHandler() function

app.get("/",(req,res)=>{
    res.end("Hello from home page.");
})

app.get("/about",(req,res)=>{
    res.end("Hello from "+ req.query.name); // this query is built-in in express
})

// const myHandler = (req, res) => {
//   const log = `${Date.now()} : ${req.url}\n`;

//   if (req.url !== "/favicon.ico") {
//     fs.appendFile(FILENAME, log, (err) => {
//       if (err) {
//         console.log(`Error : ${err}`);
//         return;
//       }
//     });
//   }

//   switch (req.url) {
//     case "/":
//       res.end("Home page");
//       break;
//     case "/about":
//       res.end("Hey! I am Priyanshu Lakwal");
//       break;
//     case "/contact-us":
//       res.end("instaID : lakwalPriyanshu");
//       break;
//     default:
//       res.end("Invalid request : Error 404");
//   }
// };

// const myServer = http.createServer(app);

// myServer.listen(PORT, () => {
//   console.log(`Server is running on the http://localhost:${PORT}`);
// });


app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});