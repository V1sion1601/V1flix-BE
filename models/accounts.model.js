"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
const db_1 = require("./db");
const { DataTypes } = require("sequelize");
exports.Accounts = db_1.sequelize.define("accounts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});
