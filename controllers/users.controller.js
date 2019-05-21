const db = require("../db");
const shortid = require("shortid");

module.exports.create = (req, res) => {
  console.log(req.cookies);
  res.render("users/create");
}

module.exports.userInfo = (req, res) => {
  let id = req.params.id;
  let user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user
  });
}

module.exports.postUsers = (req, res) => {
  req.body.id = shortid.generate();
  console.log(res.locals.success);
  // checking the code for user register validation in validation/users.validation.js
  db.get("users").unshift(req.body).write();
  res.redirect("/"); // we will redirect to login page later
}