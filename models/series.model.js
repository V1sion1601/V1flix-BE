"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
const db_1 = require("./db");
const { DataTypes } = require("sequelize");
exports.Series = db_1.sequelize.define("series", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    total_episodes: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    view: {
        type: DataTypes.INTEGER,
    },
    status: {
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