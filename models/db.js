"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("dotenv").config();
const { Sequelize } = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
exports.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database: ", error);
});
