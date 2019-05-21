const db = require("../db");
const shortid = require("shortid");

module.exports.create = (req, res) => {
  res.render("users/create");
}

module.exports.userInfo = (req, res) => {
  let id = req.params.id;
  let user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user
  });
}

module.exports.login = (req, res) => {
  res.render("users/login");
}

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = db.get('users').find({ email: email }).value();

  if (!user) {
    res.render("users/login", {
      errors: ['User does not exist'],
      values: req.body
    });
    return;
  }

  if (user.password !== password) {
    res.render("users/login", {
      errors: [
        "?? Something went wrong!"
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userid', user.id);
  res.redirect('/'); // we will replace the route to book-cart latter
}

module.exports.postUsers = (req, res) => {
  req.body.id = shortid.generate();
  console.log(res.locals.success);
  // checking the code for user register validation in validation/users.validation.js
  db.get("users").unshift(req.body).write();
  res.redirect("/"); // we will redirect to login page later
}