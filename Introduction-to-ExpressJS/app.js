//En servidores bajo ExpressJS, es comun utilizar express junto a morgan y body parser
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//inicializacion del Servidor y fijacion del puerto
const app = express();
const port = 3000;

// Configuracion de Middleware
app.use(morgan("dev")); // Morgan sirve para mostrar mensajes de ejecucion de metodos HTTP
app.use(bodyParser.json()); // Middleware para manejar archivos JSON

//Establecimiento de rutas
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hola Mundo desde ExpressJS!",
  });
});

//Arranque del servidor
app.listen(port, () => {
  console.log(`El servidor esta activo de forma local en el puerto ${port}`);
});
