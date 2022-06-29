const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    console.log("Error");
  }
};

module.exports = { createUser };
