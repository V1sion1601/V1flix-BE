import { Episodes } from "./../models/episodes.model";
import { Images } from "./../models/images.model";
import { ISeries } from "../interface";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
import { FilmsGeners } from "../models/films_geners.model";
const { Op } = require("sequelize");
export const SeriesController = {
  getAllSeries: async (req: Request, res: Response) => {
    const data: ISeries[] = await Series.findAll({
      include: Images,
      limit: 20,
      attributes: { exclude: ["season"] },
    });

    if (data) {
      console.log("Query successfully");
      res.json({ status: "success", series: data });
    }
  },
  //for search
  findSeries: async (req: Request | any, res: Response) => {
    const limit = req.query.amount
      ? {
          limit: parseInt(req.query.amount),
          attributes: ["id", "title"],
        }
      : {
          include: [Images],
        };

    try {
      const data: ISeries[] = await Series.findAll({
        where: {
          title: { [Op.like]: `%${req.params.title}%` },
        },
        ...limit,
      });
      if (data) {
        console.log("Find successfully");
        res.json({ status: "success", series: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  getFilmByTitle: async (req: Request, res: Response) => {
    const newStr = req.params.title.replace(/[\s_]+/g, " ");
    try {
      const data: ISeries[] = await Series.findOne({
        where: {
          title: newStr,
        },
        include: [Images, Episodes],
      });
      if (data) {
        console.log("Find successfully");
        res.json({ status: "success", series: data });
      } else {
        console.log("Can't find the series");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  //for search for search page
  findAllSeriesByName: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { status, filter, genre } = req.body;
      const hasStatus = status !== "" && { status };
      const hasGenere = genre !== "" && {
        model: FilmsGeners,
        where: {
          generId: genre,
        },
      };
      const data: ISeries[] = await Series.findAll({
        where: {
          title: { [Op.like]: `%${filter}%` },
          ...hasStatus,
          ...hasGenere,
        },
        include: [{ model: Images }],
      });
      if (data) {
        console.log("Find all series successfully");
        res.json({ status: "success", series: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
