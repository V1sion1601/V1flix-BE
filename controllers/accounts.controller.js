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
exports.AccountsController = void 0;
const accounts_model_1 = require("../models/accounts.model");
const bcrypt = require("bcrypt");
exports.AccountsController = {
    registerAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        const hashPassword = yield bcrypt.hashSync(password, 10);
        const data = yield accounts_model_1.Accounts.create({
            email: email,
            username: username,
            password: hashPassword,
        });
        // const match: boolean = await bcrypt.compare(password, data.password);
        if (data) {
            res.status(200).json({ status: "succeed" });
        }
        else {
            res.status(200).json({ status: "failed" });
        }
    }),
    confirmAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        const data = yield accounts_model_1.Accounts.findOne({
            where: {
                username: username,
            },
        });
        const match = yield bcrypt.compare(password, data.password);
        if (match) {
            res.status(200).json({ status: "succeed" });
        }
        else {
            res.status(200).json({ status: "failed" });
        }
    }),
    findAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield accounts_model_1.Accounts.findOne({
            where: {
                username: req.params.username,
            },
            attributes: { exclude: ["password"] },
        });
        console.log(data);
        if (data) {
            res.json({ status: "succeed", account: data });
        }
        else {
            res.json({ status: "failed" });
        }
    }),
};
