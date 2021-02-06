const mysql = require("mysql2");

class Crudite {
  // Init the connection here
  constructor(config) {
    this.connection = mysql.createPool(config);
  }

  // Method to run raw query
  query(sql, columnVal = null) {
    // If columnVal is present, it means that the user want to use prepared statement, hence call execute()
    if (columnVal) {
      return new Promise((resolve, reject) => {
        this.connection.execute(sql, columnVal, (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        });
      });
    }

    // If only sql is provided, it means that the user want to run simple read query
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  create(table, data) {
    // Extract all column that'll be populated
    const columns = Object.keys(data);
    const placeholders = columns.map(() => "?");
    const values = columns.map((column) => data[column]);
    // Prepare SQL
    let sql = "";
    sql += `INSERT INTO ${table} `;
    sql += `(${columns.join(", ")}) `;
    sql += `VALUES (${placeholders.join(", ")}) `;
    console.log(sql);
    // Run query
    return this.query(sql, values);
  }

  read(table, params = {}) {
    const { id, fields } = params;

    let sql = "";
    sql += `SELECT ${fields ? fields.join(", ") : "*"} `;
    sql += `FROM ${table}`;

    if (id) {
      sql += ` WHERE id = ${id}`;
    }

    return this.query(sql);
  }

  update(table, params) {
    const { id, data } = params;
    // Extract all column that'll be updated
    const columns = Object.keys(data);
    // Compose a prepared statement for each column
    const placeholders = columns.map((column) => `${column} = ?`);
    // Extract all intended value for each column
    const values = columns.map((column) => data[column]);

    // Prepare query
    let sql = "";
    sql += `UPDATE ${table} SET `;
    sql += placeholders.join(", ");
    sql += ` WHERE id = ${id}`;

    console.log(sql);
    // Run query
    return this.query(sql, values);
  }

  delete(table, params) {
    const { id } = params;
    // Prepare query
    let sql = "";
    sql += `DELETE FROM ${table} `;
    sql += `WHERE id = ?`;

    // Run query
    return this.query(sql, [id]);
  }
}

module.exports = Crudite;
