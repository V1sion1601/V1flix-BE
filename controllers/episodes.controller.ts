import { IEpisodes } from "./../interface";
import { Episodes } from "../models/episodes.model";
import { Request, Response } from "express";
export const EpisodesController = {
  getEpisodeById: async (req: Request, res: Response) => {
    try {
      const data: IEpisodes = await Episodes.findOne({
        where: req.params.id_series,
      });
      if (data) {
        console.log("Query episode successfully");
        res.json({ status: "success", episodes: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
