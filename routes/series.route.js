"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesRoutes = void 0;
const series_controller_1 = require("../controllers/series.controller");
const router = require("express").Router();
const SeriesRoutes = (app) => {
    router.get("/api/series", series_controller_1.SeriesController.getAllSeries);
    router.get("/api/series/find/:title", series_controller_1.SeriesController.findSeries);
    router.get("/api/series/film/:id_series", series_controller_1.SeriesController.getFilmById);
    router.post("/api/series/query", series_controller_1.SeriesController.findAllSeriesByName);
    app.use(router);
};
exports.SeriesRoutes = SeriesRoutes;
