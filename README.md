## Node MySQL 2 Crudite

> A simple promise-based query wrapper to perform basic CRUD on node-mysql2 easily.

**Disclaimer**

This library is still at a very early stage. Use it at your own risk. 

**Table of contents**

- [Why Crudite](#why-crudite)
- [Installation](#installation)
- [Setup](#setup)
- [CRUD](#crud)
- [Raw Query](#raw-query)
- [Configuration](#configuration)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)

## Why Crudite

MySQL2 is a great library that allow us to use MySQL on Node easily. To perform a crud operation you'd write something like this:

```js
// simple query
db.query(
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
db.read("table").then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

Even more simple isn't it?

## Installation

```bash
npm install crudite
```

## Setup

To use Crudite, first we need to import it (obivously) then we call connect() method and passing the config object (like the one that we usually pass to the createPool() method of mysql2) and assign it into a variable.

```js
// import crudite
const crudite = require("crudite");

// create the connection to database
const db = crudite.connect({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "test",
});
```

## CRUD

### Create

To create an entry we need to pass the table name (string) as the first argument and an object with a property named data that contain the key-value pair for each table column as second argument:

```js
db.create("table", { data: { column1: "value", column2: "value" } })
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

### Read

To retrieve all entries, we call read() method on the crudite.createConnection() and passing the table name as argument:

```js
db.read("table").then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

To retrieve an entry by id, we add the second parameter which is an object with id property and its value:

```js
db.read("table", { id: 1 })
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

If we want to specify what column returned, add fields property to the second parameter:

```js
db.read("table", { id: 1, fields: ["column1", "column2"] })
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

### Update

To update an entry we pass an object with id (integer) and data (object that contain key-value pair of the updated column) property:

```js
db.update("table", { id: 1, data: { column1: "Value1", column2: "value" } })
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

### Delete

To delete we only need to pass the id of the entry as the second argument:

```js
db.delete("table", id)
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

## Raw Query

Need more than basic CRUD query such as a join or are you more comfortable writing raw sql instead? We got you covered, just use the query() method.

```js
db.query("SELECT table1.column, table2.column FROM table1 JOIN table2 ON table1.column = table2.column")
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

You can even use prepared statement:
```js
db.query("INSERT INTO table (column1, column2) VALUES (?, ?)", ['value1', 'value2'])
.then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

## Configuration

Configuration for Crudite is basically a config object that you provide to MySQL2 createPool() method. You should check their API documentation to see all available API options.

## Roadmap

- Perform crud in bulk
- Search feature for read operation
- Enable user to specify 'where' column for read, update, and delete

## Acknowledgements

- The syntax is inspired by [Directus JavascriptSDK](https://docs.directus.io/reference/sdk-js.html#reference)
- The promise-based query method is inspired by Michal Mecinski's tutorial: [Node.js, MySQL and promises](https://codeburst.io/node-js-mysql-and-promises-4c3be599909b)

## Contributing

Found bug or want to improve `crudite`? Email me at jalurumekso@gmail.com
