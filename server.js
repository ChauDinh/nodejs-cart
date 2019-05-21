const express = require("express");

const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/users.route");

// execute
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

// home routes
app.get("/", (req, res) => {
  res.render('index', {
    name: 'Chau Dinh'
  });
});

// products routes
app.use("/products", productsRoute);

// users routes
app.use("/users", usersRoute);

// listen
app.listen(8080, () => console.log("the server is listening on port 8080"));