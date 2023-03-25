"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodesRoutes = void 0;
const episodes_controller_1 = require("./../controllers/episodes.controller");
const router = require("express").Router();
const EpisodesRoutes = (app) => {
    router.get("/api/episodes/find/:id_series", episodes_controller_1.EpisodesController.getEpisodeById);
    app.use(router);
};
exports.EpisodesRoutes = EpisodesRoutes;
