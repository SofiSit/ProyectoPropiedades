const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Favorite extends Model {}

Favorite.init(
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
    url_image: {
      type: DataTypes.STRING,
      allowNull: false, // aca con false, no permitimos que quede vacio este campo.
    },
    propId: {
      type: DataTypes.STRING,
      allowNull: false, // aca con false, no permitimos que quede vacio este campo.
    },
  },
  {
    sequelize: db,
    modelName: "favorite",   
  }
);

module.exports = Favorite;
