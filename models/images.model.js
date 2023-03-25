"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const series_model_1 = require("./series.model");
const db_1 = require("./db");
const { DataTypes } = require("sequelize");
exports.Images = db_1.sequelize.define("images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
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
