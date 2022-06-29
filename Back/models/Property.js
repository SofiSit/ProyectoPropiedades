const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");

class Property extends Model {}

Property.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const truncate = this.getDataValue("description");
        return truncate.split("").splice(0,250).concat("...").join("");
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
    onSale: {
       type: DataTypes.BOOLEAN,
       defaultValue: false,
    },
    toRent: {
       type: DataTypes.BOOLEAN,
       defaultValue: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      set(value) {
        if (!value) {
          this.setDataValue(
            "name",
            this.getDataValue("name").concat(" NOT AVAILABLE")
          );
          this.setDataValue( "available",  value );
        }
      },
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    // tableName: 'users', // We need to choose the model name
    modelName: "property",
  }
);

module.exports = Property;
