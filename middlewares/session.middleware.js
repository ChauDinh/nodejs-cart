const db = require("../db");
const shortid = require("shortid");

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    let sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    db.get("sessions")
      .unshift({ id: sessionId })
      .write();
  }

  let sessionId = req.signedCookies.sessionId;

  res.locals.cart = Object.values(
    db
      .get("sessions")
      .find({ id: sessionId })
      .get("cart")
      .value()
  );

  console.log(res.locals.cart);

  next();
};
