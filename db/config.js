require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_PORT } =
  process.env;
const {
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  DB_NAME_DEV,
  DB_HOST_DEV,
  DB_DIALECT_DEV,
  DB_PORT_DEV,
} = process.env;
const {
  DB_USERNAME_PROD,
  DB_PASSWORD_PROD,
  DB_NAME_PROD,
  DB_HOST_PROD,
  DB_DIALECT_PROD,
  DB_PORT_PROD,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
};
