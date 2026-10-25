// Built-in imports
const express = require("express");
require("dotenv").config();

// custom imports
const userRouter = require("./routes/user.route.js")
const connect = require("./db.config.js");
const logReqRes = require("./middlewares/log.middleware.js")


const PORT = process.env.PORT || 8080;
const FILENAME = "log.txt";
const mongo_url = process.env.mongodb_url;

const app = express();

//mongoDB connection
connect(mongo_url);



// middleware - plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes(FILENAME));



app.use("/api/users/", userRouter)



app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
