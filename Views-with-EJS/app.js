const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    time: new Date().toString(),
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`El servidor esta activo de forma local en el puerto ${port}`);
});
