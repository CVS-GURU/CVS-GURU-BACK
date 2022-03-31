// const mysql = require("mysql2");
const mysql = require("mysql2");
const util = require("util");
const config = require('@config/key');

// mysql 연결
const pool = mysql.createPool({
  connectionLimit: 5000,
  host: config.dbConnection.host,
  user: config.dbConnection.user,
  password: config.dbConnection.password,
  database: config.dbConnection.database,
  multipleStatements: true
});

// db 연결
pool.getConnection((err: any, connection: any) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("Database connection was closed.");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("Database has too many connections.");
        break;
      case "ECONNREFUSED":
        console.error("Database connection was refused.");
        break;
    }
  }
  if (connection) return connection.release();
});

pool.query = util.promisify(pool.query);

pool.getConnection = util.promisify(pool.getConnection);

pool.transaction = async (queries: any) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction = util.promisify(connection.beginTransaction);
    connection.commit = util.promisify(connection.commit);
    await connection.beginTransaction();
    connection.query = util.promisify(connection.query);
    for (let i in queries) {
      const query = queries[i];
      const result = await connection.query(query);
      queries[i] = result;
    }
    await connection.commit();
    connection.release();
    return queries;
  } catch (e) {
    connection.rollback = util.promisify(connection.rollback);
    await connection.rollback();
    connection.release();
    throw e;
  }
};

export default pool;