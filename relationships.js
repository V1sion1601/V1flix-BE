"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRelationships = void 0;
const episodes_model_1 = require("./models/episodes.model");
const series_model_1 = require("./models/series.model");
const images_model_1 = require("./models/images.model");
const setRelationships = () => {
    images_model_1.Images.belongsTo(series_model_1.Series);
    series_model_1.Series.hasMany(images_model_1.Images);
    series_model_1.Series.hasMany(episodes_model_1.Episodes);
    episodes_model_1.Episodes.belongsTo(series_model_1.Series);
};
exports.setRelationships = setRelationships;
