const { User } = require("../models");
const bcrypt = require("bcrypt"); // porque la usamos para comparar las password, con la libreria q usamos en el hook de user.models.
const jwt = require("jsonwebtoken"); // me genera un token medio del metodo sign, para usarlo como pase del usuario hacia las diferentes rutas de mi api.

const jwtSecret = "secret"; // esto lo pongo para comparar cuando genero el token.

const login = async (userName, password) => {
  const user = await User.findOne({ where: { userName } }); //buscamos el user
  console.log("user", user);
  if (!user) return { msg: "UserName or password not matched", token: null };

  const matchPass = await bcrypt.compare(password, user.password); // se compara la password
  console.log("match", matchPass);
  if (!matchPass)
    return { msg: "UserName or password not matched", token: null };

  const { id, admin } = user;
  const token = jwt.sign({ id, userName, admin }, jwtSecret, {
    expiresIn: 86400,
  }); // metodo sing se genera el token
  console.log(token);
  return { msg: "Login OK", token };
};

module.exports = { login };
