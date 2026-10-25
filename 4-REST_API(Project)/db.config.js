const mongoose = require("mongoose")
require("dotenv").config()

// const mongo_url = process.env.mongodb_url;
const connect = function(mongo_url){
    mongoose
      .connect(mongo_url)
      .then(() => {
        console.log("DB Connected.");
      })
      .catch(() => {
        console.log("DB not connected.");
      });
}

module.exports = connect;