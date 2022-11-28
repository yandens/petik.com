require("dotenv").config();

const { DB_USERNAME_DEV, DB_PASSWORD_DEV, DB_NAME_DEV, DB_HOST_DEV, DB_DIALECT_DEV, DB_PORT_DEV } =
  process.env;
const { DB_USERNAME_PROD, DB_PASSWORD_PROD, DB_NAME_PROD, DB_HOST_PROD, DB_DIALECT_PROD, DB_PORT_PROD } =
  process.env

module.exports = {
  development: {
    username: DB_USERNAME_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    dialect: DB_DIALECT_DEV,
    port: DB_PORT_DEV
  },
  test: {
    username: DB_USERNAME_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    dialect: DB_DIALECT_DEV,
    port: DB_PORT_DEV
  },
  production: {
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_NAME_PROD,
    host: DB_HOST_PROD,
    dialect: DB_DIALECT_PROD,
    port: DB_PORT_PROD
  },
};
