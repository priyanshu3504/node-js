const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", (req, res) => {
  const html = `
        <ul>
        ${users.map((user) => `<li>${user.first_name}</li> `).join("")}
        </ul>
    `;
  res.send(html);
});

app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    const { first_name, last_name, email, job_title } = req.body;
    if (!first_name || !last_name || !email || !job_title) {
      return res.status(400).send(`All fields are comulsory `);
    }
    let data = {
      id: users.length + 1,
      first_name,
      last_name,
      email,
      job_title,
    };
    users.push(data);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "error creating user",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "User created successfully",
        user: data,
      });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    let data = users.find((user) => user.id === id);

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(data);
  })
  .patch((req, res) => {
    // todo : update the user with id
    return res.status(500).json({
      status: "Pending",
    });
  })
  .delete((req, res) => {
    // todo delete user with id
    return res.status(500).json({
      status: "pending",
    });
  });

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
