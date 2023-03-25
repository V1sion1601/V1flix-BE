"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesController = void 0;
const episodes_model_1 = require("./../models/episodes.model");
const images_model_1 = require("./../models/images.model");
const series_model_1 = require("../models/series.model");
const { Op } = require("sequelize");
exports.SeriesController = {
    getAllSeries: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield series_model_1.Series.findAll({
            include: images_model_1.Images,
            limit: 20,
            attributes: { exclude: ["season"] },
        });
        if (data) {
            console.log("Query successfully");
            res.json({ status: "success", series: data });
        }
    }),
    //for search
    findSeries: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const limit = req.query.amount
            ? {
                limit: parseInt(req.query.amount),
                attributes: ["id", "title"],
            }
            : {
                include: [images_model_1.Images],
            };
        try {
            const data = yield series_model_1.Series.findAll(Object.assign({ where: {
                    title: { [Op.like]: `%${req.params.title}%` },
                } }, limit));
            if (data) {
                console.log("Find successfully");
                res.json({ status: "success", series: data });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }),
    getFilmById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield series_model_1.Series.findOne({
                where: {
                    id: req.params.id_series,
                },
                include: [images_model_1.Images, episodes_model_1.Episodes],
            });
            if (data) {
                console.log("Find successfully");
                res.json({ status: "success", series: data });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }),
    //for search for search page
    findAllSeriesByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { status, filter } = req.body;
            const hasStatus = status !== "" && { status };
            const data = yield series_model_1.Series.findAll({
                where: Object.assign({ title: { [Op.like]: `%${filter}%` } }, hasStatus),
                include: [images_model_1.Images],
            });
            if (data) {
                console.log("Find all series successfully");
                res.json({ status: "success", series: data });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }),
};
