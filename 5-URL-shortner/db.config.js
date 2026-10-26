const mongoose = require("mongoose");

const connectDB = async function (mongo_url) {
    await mongoose
      .connect(mongo_url)
      .then(() => {
        console.log(`MongoDB Connected successfully`);
      })    
      .catch((error) => {
        console.log(`error : ${error}`);
      });
  
};

module.exports = connectDB;
