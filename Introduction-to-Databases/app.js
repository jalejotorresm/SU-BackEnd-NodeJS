const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const TaskModel = require("./models/TaskModel");
const morgan = require("morgan");

const app = express();

// Conexion a MongoDB
const server = app.listen(process.env.PORT, () => {
  console.log("Servidor Activo");
  mongoose.connect(process.env.db_connection).then(() => {
    console.log("Base de datos conectada");
  });
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  TaskModel.find({}).then((tasks) => {
    res.render("index.ejs", { todos: tasks });
  });
});

app.post("/tasks/", (req, res) => {
  const newTodo = new TaskModel({
    task: req.body.task,
  });

  newTodo.save();
  res.redirect("/");
});

app.post("/tasks/:id/complete", (req, res) => {
  TaskModel.findById(req.params.id).then((todo) => {
    todo.is_completed = !todo.is_completed;
    todo.save();
    res.redirect("/");
  });
});

app.post("/tasks/:id/update", (req, res) => {
  TaskModel.findById(req.params.id).then((todo) => {
    todo.task = req.body.task;
    todo.save();
    res.redirect("/");
  });
});

app.post("/tasks/:id/delete", (req, res) => {
  TaskModel.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/");
  });
});

module.exports = {
  mongoose,
};
