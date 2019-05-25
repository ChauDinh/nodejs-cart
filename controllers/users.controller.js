const db = require("../db");
const shortid = require("shortid");
const md5 = require("md5");

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.userInfo = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: user
  });
};

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let password = md5(req.body.password); // hash password by md5 before checking whether it matches to user password in database

  // Find in database the user having the same email, if yes then check the user password

  let user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("users/login", {
      errors: ["User does not exist"],
      values: req.body
    });
    return;
  }

  if (user.password !== password) {
    res.render("users/login", {
      errors: ["?? Something went wrong!"],
      values: req.body
    });
    return;
  }

  res.cookie("userid", user.id, {
    signed: true
  });
  res.redirect("/"); // we will replace the route to book-cart latter
};

module.exports.postUsers = (req, res) => {
  req.body.avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  req.body.id = shortid.generate();
  req.body.password = md5(req.body.password);
  console.log(res.locals.success);
  // checking the code for user register validation in validation/users.validation.js
  db.get("users")
    .unshift(req.body)
    .write();
  res.redirect("/"); // we will redirect to login page later
};
