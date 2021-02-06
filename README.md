## Node MySQL 2 Crudite

> A simple promise-based query wrapper to perform basic CRUD on node-mysql2 easily.

**Table of contents**

- [Why Crudite](#why-crudite)
- [Installation](#installation)
- [Promise-based CRUD](#promise-crud)
- [Documentation](#documentation)
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

## Promise CRUD

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

## Using Async/Await

With MySQL2 you also get the prepared statements. With prepared statements MySQL doesn't have to prepare plan for same query everytime, this results in better performance. If you don't know why they are important, please check these discussions

- [How prepared statements can protect from SQL Injection attacks](http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks)

MySQL provides `execute` helper which will prepare and query the statement. You can also manually prepare / unprepare statement with `prepare` / `unprepare` methods.

```js
// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
});

// execute will internally call prepare and query
connection.execute(
  "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
  ["Rick C-137", 53],
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    // If you execute same statement again, it will be picked from a LRU cache
    // which will save query preparation time and give better performance
  }
);
```

## Configuration

Configuration for Crudite is basically a config object that you provide to MySQL2 createPool() method. You should check their API documentation to see all available API options.

## Acknowledgements

- The syntax is inspired by [Directus JavascriptSDK](https://docs.directus.io/reference/sdk-js.html#reference)
- The promise-based query method is inspired by Michal Mecinski's tutorial: [Node.js, MySQL and promises](https://codeburst.io/node-js-mysql-and-promises-4c3be599909b)

## Contributing

Found bug or want to improve something in `crudite`? Email me at jalurumekso@gmail.com
