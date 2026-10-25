const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");
const { type } = require("os");

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const FILENAME = "log.txt";
const app = express();
const mongo_url = process.env.mongodb_url;

//mongoose connection
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("DB Connected.");
  })
  .catch(() => {
    console.log("DB not connected.");
  });

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
},{timestamps:true});

const User = mongoose.model("user", userSchema);

// middleware - plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  let data = `${Date.now()} | ${req.method} | ${req.url}\n`;
  fs.appendFile(FILENAME, data, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        task: "writing logs",
      });
    }
    next();
  });
});
// app.use((req,res,next)=>{
//   console.log("Hello from middleware 2.");
//   next();
// })

app.get("/users",async (req, res) => {
  const users = await User.find({});
  const html = `
        <ul>
        ${users.map((user) => `<li>${user.firstName} - ${user.email}</li> `).join("")}
        </ul>
    `;
  res.send(html);
});

app
  .route("/api/users")
  .get(async (req, res) => {
    const data = await User.find({})
    res.json(data);
  })
  .post(async (req, res) => {
    const { firstName, lastName, email, jobTitle } = req.body;
    if (!firstName || !lastName || !email || !jobTitle) {
      return res.status(400).send(`All fields are comulsory `);
    }
    let data = {
      // id: User.find({}).length + 1,
      firstName,
      lastName,
      email,
      jobTitle,
    };

    const result = await User.create(data);
    res.status(201).json({
      message : "User created",
      data : result
    })

    // users.push(data);
    // fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    //   if (err) {
    //     return res.status(500).json({
    //       message: "error creating user",
    //       error: err.message,
    //     });
    //   }

    //   res.status(200).json({
    //     message: "User created successfully",
    //     user: data,
    //   });
    // });
  });

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = (req.params.id);
    let data = await User.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(data);
  })
  .patch(async (req, res) => {
    // todo : update the user with id
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.status(200).json({
      status: "Success",
      data : await User.findById(req.params.id)
    });
  })
  .delete(async (req, res) => {
    // todo delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
    });
  });

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
