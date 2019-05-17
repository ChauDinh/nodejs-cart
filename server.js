const express = require("express");

// execute
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// set view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Initialize mock data
const products = [
  {
    id: 1,
    name: "quan lot nu"
  },
  {
    id: 2,
    name: 'quan lot nam'
  }
];

// routes
app.get("/", (req, res) => {
  res.render('index', {
    name: 'Chau Dinh'
  });
});

app.get("/products", (req, res) => {
  res.render('products/index', {
    products: products
  });
});

app.get("/products/search", (req, res) => {
  let q = req.query.q;
  let matchedProducts = products.filter(product => product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('products/index', {
    products: matchedProducts
  });
});

app.get("/products/create", (req, res) => {
  res.render('products/create');
});

app.post("/products/create", (req, res) => {
  products.unshift(req.body);
  res.redirect("/products");
})

// listen
app.listen(8080, () => console.log("the server is listening on port 8080"));