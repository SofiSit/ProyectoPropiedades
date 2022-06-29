const Sequelize = require("sequelize");
//const { User } = require ("../../models");

const db = new Sequelize("dbpropiedades", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
/* User.bulkCreate(
  [
    {  name: "Pedro", lastName: "Sanchez", userName: "PepS", password: "123456"},
    {  name: "Malena", lastName: "Pareto", userName: "Malenita", password: "123456"},
    {  name: "Fernando", lastName: "Carrafiello", userName: "Fercho", password: "123456"},
  ],
  {
    ignoreDuplicates: true,
  }
).then(() => console.log("Users data have been saved"));   */

module.exports = db;
