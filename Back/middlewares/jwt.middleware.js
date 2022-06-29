const { User } = require("../models");
const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ").join("");
    if (!token)
      return res.status(200).send({ msg: "Token no provisto", token: null }); // hacemos un condicional simple, para no perder tiempo.

    const decoded = jwt.verify(token, jwtSecret); // de existir nos decodificaria el token.
    //console.log('decoded', decoded);
    req.user = decoded; // le agregamos al objeto req, el elemento user, y a este le ponemos el key decoded

    const user = await User.findByPk(decoded.id);
    if (!user)
      return res
        .status(200)
        .send({ msg: "usuario no encontrado", token: null });

    next(); //terminamos. continua con otra cosa.
  } catch (error) {
    res.status(200).send({ msg: "Token invalido", token: null });
  }
};

module.exports = verifyToken;

//lo metemos en medio de todas las request que tengamos
