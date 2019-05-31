// Dotenv config
require("dotenv").config();

const express = require("express");

console.log(process.env.SESSION_SECRET);

const cookieParser = require("cookie-parser");
const csurf = require("csurf");

const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/users.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");
const isUser = require("./middlewares/isUser.middleware");
const session = require("./middlewares/session.middleware");

// execute
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session);
app.use(csurf({ cookie: true }));

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

// cart routes
app.use("/cart", cartRoute);

// transfer routes
app.use("/transfer", isUser.isUser, transferRoute);

// listen
app.listen(8000, () => console.log("the server is listening on port 8000"));
