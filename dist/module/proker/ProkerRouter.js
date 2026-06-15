"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ProkerRouter.ts
const express_1 = __importDefault(require("express"));
const ProkerController_1 = __importDefault(require("../../module/proker/ProkerController"));
const prokerRouter = express_1.default.Router();
// Wrap handlers properly with explicit typing -- Ini eror memang gilerr sia
prokerRouter.get("/", (req, res, next) => {
    ProkerController_1.default.getProkers(req, res).catch(next);
});
prokerRouter.post("/", (req, res, next) => {
    ProkerController_1.default.postProker(req, res).catch(next);
});
// Tambahkan di dalam file ProkerRouter.ts kamu
prokerRouter.get("/:id", (req, res, next) => {
    ProkerController_1.default.getProkerById(req, res).catch(next);
});
// Endpoint untuk menghapus Proker berdasarkan ID
prokerRouter.delete("/:id", (req, res, next) => {
    ProkerController_1.default.deleteProker(req, res).catch(next);
});
// Endpoint untuk memperbarui Proker berdasarkan ID
prokerRouter.put("/:id", (req, res, next) => {
    ProkerController_1.default.updateProker(req, res).catch(next);
});
exports.default = prokerRouter;
