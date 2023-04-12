import { Request, Response } from "express";
import { Lists } from "../models/lists.model";
import { Series } from "../models/series.model";
import { Images } from "../models/images.model";

export const ListsController = {
  addSeries: async (req: Request, res: Response) => {
    console.log(req.body);
    const { id_user, id_series, status } = req.body;
    const data: any = await Lists.create({
      accountId: id_user,
      seriesId: id_series,
      status: status,
    });
    if (data) {
      res.status(200).json({ status: "succeed" });
    } else {
      res.status(200).json({ status: "failed" });
    }
  },

  getLists: async (req: Request, res: Response) => {
    const data: any = await Lists.findAll({
      raw: true,
      where: {
        accountId: req.params.userId,
      },
      attributes: {
        exclude: ["accountId", "id"],
      },
      include: [Series],
    });

    if (data) {
      //will fix and improve this soon
      //getting ids from series
      let ids = data.map((item: any) => item.seriesId);
      //find all images base on ids
      let resultImg = await Images.findAll({
        raw: true,
        where: {
          seriesId: ids,
        },
        attributes: {
          exclude: ["id"],
        },
        order: [["seriesId", "DESC"]],
      });
      console.log(resultImg);
      let finalResult = data.map((item: any) => ({
        ...item,
        images: resultImg.filter(
          (image: any) => image.seriesId === item.seriesId
        ),
      }));

      res.status(200).json({ status: "good", data: finalResult });
    } else {
      res.json({ status: "failed" });
    }
  },
  getListById: async (req: Request, res: Response) => {
    const data: any = await Lists.findOne({
      where: {
        accountId: req.params.userId,
        seriesId: req.params.seriesId,
      },
      attributes: {
        exclude: ["accountId", "id"],
      },
    });
    if (data) {
      res.status(200).json({ status: "succeed", userStatus: data.status });
    } else {
      res.status(200).json({ status: "failed" });
    }
  },
};
