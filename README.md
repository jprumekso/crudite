## Node MySQL 2 Crudite

> A simple promise-based query wrapper to perform basic CRUD on node-mysql2 easily.

**Table of contents**

- [Why Crudite](#why-crudite)
- [Installation](#installation)
- [Promise-based CRUD](#using-promise)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)

## Why Crudite

MySQL2 is a great library that allow us to use MySQL on Node easily. To perform a crud operation you'd write something like this:

```js
// simple query
connection.query(
  'SELECT * FROM `table`,
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
```

But, what if you could write something like this instead?

```js
// simple read query
connection
  .read("table")
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
```

Even more simple isn't it?

## Installation

```bash
npm install crudite
```

## Using Promise

```js
// get the client
const crudite = require("crudite");

// create the connection to database
const connection = crudite.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "test",
});

/****** READ ******/

// Retrieve all entries with all column
connection
  .read("table")
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });

// Retrieve all entries with certain column
connection
  .read("table", { fields: ["column1", "column2"] })
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });

// Retrieve entry by id
connection
  .read("table", { id: 1 })
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });

// Retrieved entry by id with certain column
connection
  .read("table", { id: 1, fields: ["column1", "column2"] })
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Configuration

Configuration for Crudite is basically a config object that you provide to MySQL2 createPool() method. You should check their API documentation to see all available API options.

## Acknowledgements

- The syntax is inspired by [Directus JavascriptSDK](https://docs.directus.io/reference/sdk-js.html#reference)
- The promise-based query method is inspired by Michal Mecinski's tutorial: [Node.js, MySQL and promises](https://codeburst.io/node-js-mysql-and-promises-4c3be599909b)

## Contributing

Found bug or want to improve something in `crudite`? Email me at jalurumekso@gmail.com
