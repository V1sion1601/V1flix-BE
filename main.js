"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_route_1 = require("./routes/accounts.route");
const relationships_1 = require("./relationships");
const images_route_1 = require("./routes/images.route");
const series_route_1 = require("./routes/series.route");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.listen(Number(port), () => {
    console.log(`Server is listening on port ${port} ...`);
});
//Routes
(0, series_route_1.SeriesRoutes)(app);
(0, images_route_1.ImagesRoutes)(app);
(0, accounts_route_1.AccountsRoutes)(app);
//Relationship
(0, relationships_1.setRelationships)();
const setCache = (req, res, next) => {
    const period = 60 * 5;
    if (req.method === "GET") {
        res.set("Cache-control", `public, max-age=${period}`);
    }
    else {
        res.set("Cache-control", `no-store`);
    }
    next();
};
app.use(setCache);
