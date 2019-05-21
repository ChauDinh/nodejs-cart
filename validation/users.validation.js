module.exports.postUsers = (req, res, next) => {
  let errors = [];

  if (!req.body.username) {
    errors.push("Username is required!");
  }
  if (!req.body.password) {
    errors.push("Password is required!");
  }
  if (!req.body.email) {
    errors.push("Email is required!");
  }

  if (errors.length) {
    res.render("users/create", {
      errors: errors,
      values: req.body
    });
    return;
  }

  res.locals.success = true;

  next();
}