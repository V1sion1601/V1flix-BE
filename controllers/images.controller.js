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
exports.ImagesController = void 0;
const images_model_1 = require("./../models/images.model");
exports.ImagesController = {
    findImagesById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield images_model_1.Images.findAll({
                where: {
                    seriesId: req.params.id_series,
                },
            });
            if (data) {
                console.log("Query image successfully");
                res.json({ status: "success", images: data });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }),
};
