const express = require("express");
const low = require("lowdb");
const shortid = require("shortid");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");

db = low(adapter);

// Set some defaults(required if the JSON file is empty)
db.defaults({
  products: []
}).write();

// execute
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// set view engine
app.set('view engine', 'pug');
app.set('views', './views');



// routes
app.get("/", (req, res) => {
  res.render('index', {
    name: 'Chau Dinh'
  });
});

app.get("/products", (req, res) => {
  res.render('products/index', {
    products: db.get('products').value()
  });
});

app.get("/products/search", (req, res) => {
  let q = req.query.q;
  let matchedProducts = db.get('products').filter('products', function(product) {
    return product;
  }).value();
  console.log(matchedProducts);
  res.render('products/index', {
    products: matchedProducts
  });
});

app.get("/products/create", (req, res) => {
  res.render('products/create');
});

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  let product = db.get('products').find({ id: id }).value();
  res.render('products/view', {
    product: product
  });
});

app.post("/products/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get('products').unshift(req.body).write();
  res.redirect("/products");
})

// listen
app.listen(8080, () => console.log("the server is listening on port 8080"));