const db = require("./config/db");
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // error interno

app.use("/api", routes);

//middleware error (error handler)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

db.sync({ force: false }) //agrego la sincronizacion en true.
  .then(function () {
    console.log("DB Conected");
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  });
