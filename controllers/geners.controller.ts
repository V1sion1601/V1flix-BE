import { FilmsGeners } from "../models/films_geners.model";
import { Images } from "../models/images.model";
import { Series } from "../models/series.model";
import { Geners } from "./../models/geners.model";
import { Request, Response } from "express";

export const GenersController = {
  getGeners: async (req: Request, res: Response) => {
    const data: any = await Geners.findAll();
    if (data) {
      res.json({ status: "success", geners: data });
    } else {
      res.json({ status: "failed" });
    }
  },
  getGenerByName: async (req: Request, res: Response) => {
    const data: any = await Geners.findAll({
      raw: true,
      where: {
        name: req.params.name,
      },
      include: [FilmsGeners],
    });

    if (data) {
      const ids = data.map((gener: any) => {
        return gener["series_geners.seriesId"];
      });
      const filmData = await Series.findAll({
        where: {
          id: ids,
        },
        include: [Images],
      });
      console.log(filmData);
      if (filmData) res.json({ status: "success", films: filmData });
    } else {
      res.json({ status: "failed" });
    }
  },
};
