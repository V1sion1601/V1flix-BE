"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesRoutes = void 0;
const images_controller_1 = require("./../controllers/images.controller");
const router = require("express").Router();
const ImagesRoutes = (app) => {
    router.get("/api/images/find/:id_series", images_controller_1.ImagesController.findImagesById);
    app.use(router);
};
exports.ImagesRoutes = ImagesRoutes;
