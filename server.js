// Dotenv config
require("dotenv").config();

const express = require("express");

console.log(process.env.SESSION_SECRET);

const cookieParser = require("cookie-parser");

const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/users.route");
const isUser = require("./middlewares/isUser.middleware");

// execute
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

// set view engine
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

// home routes
app.get("/", isUser.isUser, (req, res) => {
  res.render("index", {
    name: "Chau Dinh"
  });
});

// products routes
app.use("/products", isUser.isUser, productsRoute);

// users routes
app.use("/users", isUser.isUser, usersRoute);

// listen
app.listen(8080, () => console.log("the server is listening on port 8080"));
