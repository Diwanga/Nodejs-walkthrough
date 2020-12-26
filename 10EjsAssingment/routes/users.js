const express = require("express");
const routes = express.Router();
const userlist = [];
routes.get("/users", (req, res, next) => {
  res.render("users", { users: userlist, title: "Dashbord" });
});

routes.post("/users", (req, res, next) => {
  console.log(req.body.name);
  userlist.push({ name: req.body.name });
  res.redirect("/");
});

exports.router = routes;
exports.usserlist = userlist;
