const User = require("../models/user.model.js")

async function handleGetAllUsers(req,res){
    const userData = await User.find({})
    return res.status(200).json(userData);
}

async function handleCreateUser(req,res){
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
          message: "User created",
          data: result,
        });
    
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
}

async function handleGetUserById(req,res){
    const id = req.params.id;
    let data = await User.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(data);
  
}

async function handleUpdataeUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.status(200).json({
      status: "Success",
      data: await User.findById(req.params.id),
    });
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
    });
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdataeUserById,
    handleDeleteUserById
}