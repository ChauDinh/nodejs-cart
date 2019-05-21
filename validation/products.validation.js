module.exports.postProducts = function(req, res, next) {
  let errors = [];

  if (!req.body.name) {
    errors.push("Name is required!");
  }
  if (!req.body.author) {
    errors.push("Author is required!");
  }
  if (!req.body.published) {
    errors.push("Published year is required!");
  }

  if (errors.length) {
    res.render("products/create", {
      errors: errors,
      values: req.body
    });
    return; 
  }

  res.locals.success = true;

  next();
};