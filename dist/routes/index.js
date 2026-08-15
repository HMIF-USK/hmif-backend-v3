"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = __importDefault(require("../module/auth/AuthRouter"));
const ActivityRouter_1 = __importDefault(require("../module/activities/ActivityRouter"));
const AchievementsRouter_1 = __importDefault(require("../module/achievements/AchievementsRouter"));
const Achievementrouter_1 = __importDefault(require("../module/achievement/Achievementrouter"));
const DepartmentRouter_1 = __importDefault(require("../module/department/DepartmentRouter"));
const ProkerRouter_1 = __importDefault(require("../module/proker/ProkerRouter"));
const EventRouter_1 = __importDefault(require("../module/events/EventRouter"));
const router = (0, express_1.Router)();
router.use("/auth", AuthRouter_1.default);
router.use("/activities", ActivityRouter_1.default);
// Baca dulu (publik, GET saja), sisanya jatuh ke achievementRouter yang ber-verifyToken.
router.use("/achievements", AchievementsRouter_1.default);
router.use("/achievements", Achievementrouter_1.default);
router.use("/departments", DepartmentRouter_1.default);
router.use("/prokers", ProkerRouter_1.default);
router.use("/events", EventRouter_1.default);
exports.default = router;
