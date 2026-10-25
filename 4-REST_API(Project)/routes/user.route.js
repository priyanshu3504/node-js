const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js")

const {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdataeUserById,
    handleDeleteUserById
} = require("../controllers/user.controller.js")

// router.get("/users", async (req, res) => {
//   const users = await User.find({});
//   const html = `
//         <ul>
//         ${users.map((user) => `<li>${user.firstName} - ${user.email}</li> `).join("")}
//         </ul>
//     `;
//   res.send(html);
// });

router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdataeUserById)
  .delete(handleDeleteUserById);


module.exports = router;