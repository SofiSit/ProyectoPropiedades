const db = require("../config/db");
const bcrypt = require("bcrypt");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

//Inicializar la tabla
User.init(
  {
    //Campos
     id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false, // aca con false, no permitimos que quede vacio este campo.
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // aca con false, no permitimos que quede vacio este campo.
    },
    admin:{
      type: DataTypes.BOOLEAN,
      defaultValue:false,
  },
    userName: {
      type: DataTypes.STRING,
      allowNull: false, // aca con false, no permitimos que quede vacio este campo.
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      /* validate: {
        is: "^[A-Za-z]+((s)?(('|-|.)?([A-Za-z])+))*$", //passport.-
      }, */
    },
    salt: {
      //se usa por dentro para el hook beforeCreate para el hasheo, vamos a guardar la cantidad de capas
      type: DataTypes.STRING,
    },
  },
  //Conexion con db y nombre del modelo
  {
    sequelize: db,
    modelName: "user",
  }
);

//para hacer el hasheo hay que hacer un hook, los cuales modifican el modelo.
User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16) //genSalt son las capas q va a utilizar para hacer el hash
    .then((salt) => {
      user.salt = salt; // user.salt se refiere s insertarlo en el modelo de la tabla
      return bcrypt.hash(user.password, user.salt); //user.hash() conviierte en un string irreconosible el string que yo le paso.
    })
    .then((hash) => {
      user.password = hash; //reemplazo el password del model perteneciente al usuario, lo reemplaza por la hash creada.
    }); //recorda que hash, es lo que me devuelven las 2 promesas anteriores.
});

// metodo de instancia es cuando lo utilizo a partir de una instancia, es decir que utilizo la plantilla del modelo y creo un usuario, ahi puedo usar ese metodo.
module.exports = User;
