"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episodes = void 0;
const series_model_1 = require("./series.model");
const db_1 = require("./db");
const { DataTypes } = require("sequelize");
exports.Episodes = db_1.sequelize.define("episodes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    ep_num: {
        type: DataTypes.INTEGER,
    },
    source: {
        type: DataTypes.STRING,
    },
    seriesId: {
        type: DataTypes.INTEGER,
        references: {
            model: series_model_1.Series,
            key: "id",
        },
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});
