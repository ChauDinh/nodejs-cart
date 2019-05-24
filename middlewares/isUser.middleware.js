const db = require("../db");

module.exports.isUser = (req, res, next) => {
  let username = "";
  let user = db
    .get("users")
    .find({ id: req.signedCookies.userid })
    .value();
  req.signedCookies.userid ? (username = user.username) : (username = "Guess");

  res.locals.username = username;
  // console.log(res.locals.username);

  next();
};
