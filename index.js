const mysql = require("mysql2");

const database = {};

// define database property
database.connection = null;

// Method to connect to database
database.connect = (config) => {
  database.connection = mysql.createPool(config);
};

// Raw query
database.query = (sql, columnVal = null) => {

  if(columnVal) {
    return new Promise((resolve, reject) => {
      database.connection.execute(sql, columnVal, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  return new Promise((resolve, reject) => {
    database.connection.query(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

  database.create = async (table, data) => {
    // Extract all column that'll be populated
    const columns = Object.keys(data);
    const preparedColumn = columns.map(column => `${column} = ?`);
    const columnValue = columns.map((column) => data[column]);
    // Prepare SQL
    let sql = "";
    sql += `INSERT INTO ${table} `;
    sql += `(${columns.join()}) `;
    sql += `VALUES(${preparedColumn.join(', ')}) `;
    // Run query
    return database.query(sql, columnValue);
  }

database.read = async (table, params = {}) => {

  const { id, fields } = params;

  let sql = "";
  sql += `SELECT ${fields ? fields.join(", ") : "*"} `;
  sql += `FROM ${table}`;

  if (id) {
    sql += ` WHERE id = ${id}`;
  }

  return database.query(sql);
};

database.update = async (table, params) => {
  const {id, data} = params;
  // Extract all column that'll be updated
  const columns = Object.keys(data);
  // Compose a prepared statement for each column
  const preparedColumn = columns.map((column) => `${column} = ?`);
  // Extract all intended value for each column
  const columnValue = columns.map((column) => data[column]);

  // Prepare query
  let sql = "";
  sql += `UPDATE ${table} SET `;
  sql += preparedColumn.join(", ");
  sql += ` WHERE id = ${id}`;

  // Run query
  return database.query(sql, columnValue);
};

database.delete = async (table, id) => {
  // Prepare query
  let sql = "";
  sql += `DELETE FROM ${table} `;
  sql += `WHERE id = ?`;

  // Run query
  return database.query(sql, id);
}

module.exports = database;
