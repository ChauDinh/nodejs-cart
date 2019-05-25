const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("products/index", {
    products: db
      .get("products")
      .value()
      .slice(0, 4)
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedProducts = db
    .get("products")
    .value()
    .filter(
      product => product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    );
  console.log(matchedProducts);
  res.render("products/index", {
    products: matchedProducts,
    searchPhrase: q
  });
};

module.exports.create = (req, res) => {
  res.render("products/create");
};

module.exports.productDetails = (req, res) => {
  let id = req.params.id;
  let product = db
    .get("products")
    .find({ id: id })
    .value();
  res.render("products/view", {
    product: product
  });
};

module.exports.postProducts = (req, res) => {
  req.body.id = shortid.generate();
  console.log(res.locals.success);
  // checking the code for products validation in validation/products.validation.js
  db.get("products")
    .unshift(req.body)
    .write();
  res.redirect("/products");
};
