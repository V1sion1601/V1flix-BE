import { EpisodesController } from "./../controllers/episodes.controller";
import { Express, Router } from "express";
const router: Router = require("express").Router();
export const EpisodesRoutes = (app: Express) => {
  router.get(
    "/api/episodes/find/:id_series",
    EpisodesController.getEpisodeById
  );
  app.use(router);
};
