import { IEpisodes } from "./../interface";
import { Episodes } from "../models/episodes.model";
import { Request, Response } from "express";
import { Series } from "../models/series.model";
import { Images } from "../models/images.model";
export const EpisodesController = {
  getEpisodes: async (req: Request, res: Response) => {
    try {
      const data: IEpisodes = await Episodes.findAll({
        order: [["id", "DESC"]],
        include: [{ model: Series, include: [Images] }],
      });
      if (data) {
        console.log("Query episode successfully");
        res.json({ status: "success", episodes: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  getEpisodeById: async (req: Request, res: Response) => {
    console.log(req.params.id_series)
    try {
      const data: IEpisodes = await Episodes.findOne({
        where: {
          seriesId: req.params.id_series
        },
      });
      if (data) {
        console.log("Query episode successfully");
        res.json({ status: "success", episodes: data });
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
  createEpisode: async (req: Request, res: Response) => {
    const data = req.body
    console.log(data);
    try {
      const [episode, created] = await Episodes.findOrCreate({
        where: {
          seriesId: data.seriesId,
          ep_num: data.ep_num
        },
        defaults: data 
      })
      console.log(created)
      if(created) {
        res.status(200).json({status: "success", episode: episode})
      } else {
        res.status(404).json({status: "failed", msg: "Episode existed"})
      }
    } catch(err: any) {
      res.status(404).json({status: "failed", msg: "Episode can't be created"})
    }
  },
  updateEpisode: async (req: Request, res: Response) => {
    const data = {...req.body} 
    delete data.id
    try {
      const search = await Episodes.findOne({where: {
        id: req.body.id
      }}) 
      if(search) {
        const result = await Episodes.update(data, {
          where: {
            id: req.body.id,
          },
        })
        console.log(result);
        res.status(200).json({status: "success", msg: "Updated successfully"})
      } else {
        res.status(404).json({status: "failed", msg: "Episode can't be found"})
      }
    } catch(err: any) {
      res.status(404).json({status: "failed", msg: "Episode can't be updated"})
    }
  },
  deleteEpisode: async (req: Request, res: Response) => {
    try {
      const search = await Episodes.findOne({where: {
        id: req.body.id
      }})
      if(search) {
        const result = await Episodes.destroy({
          where: {
            id: req.body.id,
          },
        })
        console.log(result);
        res.status(200).json({status: "success", msg: "Deleted successfully"})
      } else {
        res.status(404).json({status: "failed", msg: "Episode can't be found"})
      }
    } catch(err: any) {
      res.status(404).json({status: "failed", msg: "Episode can't be deleted"})
    }
  }
};
