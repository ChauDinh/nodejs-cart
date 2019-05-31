const db = require("../db");
const shortid = require("shortid");

module.exports.create = (req, res, next) => {
  res.render("transfer/create", {
    csrfToken: req.csrfToken()
  });
};

module.exports.postCreate = (req, res, next) => {
  let data = {
    id: shortid.generate(),
    amount: parseInt(req.body.amount),
    account: req.body.account,
    userId: req.signedCookies.userid
  };
  db.get("transfer")
    .unshift(data)
    .write();
  res.redirect("/transfer/create");
};
