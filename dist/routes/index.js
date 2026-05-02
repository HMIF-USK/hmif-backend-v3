"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = __importDefault(require("../module/auth/AuthRouter"));
const router = (0, express_1.Router)();
router.use("/auth", AuthRouter_1.default);
exports.default = router;
