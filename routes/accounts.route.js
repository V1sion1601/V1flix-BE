"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsRoutes = void 0;
const accounts_controller_1 = require("./../controllers/accounts.controller");
const router = require("express").Router();
const AccountsRoutes = (app) => {
    router.post("/api/login", accounts_controller_1.AccountsController.confirmAccount);
    router.post("/api/register", accounts_controller_1.AccountsController.registerAccount);
    router.get("/api/get-account/:username", accounts_controller_1.AccountsController.findAccount);
    app.use(router);
};
exports.AccountsRoutes = AccountsRoutes;
