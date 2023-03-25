"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodesController = void 0;
const episodes_model_1 = require("../models/episodes.model");
exports.EpisodesController = {
    getEpisodeById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield episodes_model_1.Episodes.findOne({
                where: req.params.id_series,
            });
            if (data) {
                console.log("Query episode successfully");
                res.json({ status: "success", episodes: data });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }),
};
