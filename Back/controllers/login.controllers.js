const { loginService } = require("../services");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const response= await loginService.login(userName, password);
    return res.status(200).send(response);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = { login };
