# eCommerce site with Node.js

This repo is an update version of `mo-cart` repository since I've recently lost some code.

## What we will cover?

- Use node.js for writing server

- Use pug(jade) for the template engine

- Use express.js and express router

- Responsive design with bootstrap4

- Use multer to upload file

- Deploy to Heroku

### Installation

```
git clone git@github.com:ChauDinh/nodejs-cart.git

cd nodecart/

npm install

npm run server:watch
```

Or we can check the demo version here: nodejs.cart.netlify.com

### About middleware functions

```JavaScript

```

### About the form of db.json

```JSON
products: [
  {
    "name": "String",
    "author": "String",
    "published": "String",
    "id": "shortid"
  }
],
users: [
  {
    "username": "String",
    "password": "hashed",
    "email": "String",
    "avatar": "static file",
    "id": "shortid"
  }
]

```

### CSRF Attack (Cross-site request forgery)
