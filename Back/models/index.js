const User = require('./User'); // llamo a donde establesco el modelo de user.
const Favorite = require('./Favorite'); 
const Category = require ('./Category');
const Property = require ('./Property')
// llamoa a donde establesco el modelo de favorite.

User.hasMany(Favorite); //relacion que me genera un id del padre al hijo

Category.belongsToMany(Property, {through:'Category_Property'})

Property.belongsToMany(Category, {through:'Category_Property'})// tabla intermedia con este nombre

module.exports = { User, Favorite, Category, Property };