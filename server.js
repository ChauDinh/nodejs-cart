const express = require("express");

// execute
const app = express();

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
    products: [
      {
        id: 1,
        name: "quan lot nu"
      },
      {
        id: 2,
        name: 'quan lot nam'
      }
    ]
  });
});

// listen
app.listen(8080, () => console.log("the server is listening on port 8080"));