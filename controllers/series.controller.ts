import { Episodes } from "./../models/episodes.model";
import { Images } from "./../models/images.model";
import { ISeries } from "../interface";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
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
  getFilmById: async (req: Request, res: Response) => {
    try {
      const data: ISeries[] = await Series.findOne({
        where: {
          id: req.params.id_series,
        },
        include: [Images, Episodes],
      });
      if (data) {
        console.log("Find successfully");
        res.json({ status: "success", series: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  //for search for search page
  findAllSeriesByName: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { status, filter } = req.body;
      const hasStatus = status !== "" && { status };
      const data: ISeries[] = await Series.findAll({
        where: {
          title: { [Op.like]: `%${filter}%` },
          ...hasStatus,
        },
        include: [Images],
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
