"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Achievementcontroller_1 = require("./Achievementcontroller");
const auth_1 = require("../../middleware/auth");
const Achievementvalidation_1 = require("./Achievementvalidation");
const achievementRouter = (0, express_1.Router)();
achievementRouter.use(auth_1.verifyToken);
// Hanya departemen MBA (dan superUser) yang boleh kelola achievement.
achievementRouter.use((0, auth_1.requireRole)("mba", "superUser"));
// POST /achievements
achievementRouter.post("/", Achievementvalidation_1.validateCreateAchievement, Achievementcontroller_1.achievementController.create);
// PUT /achievements/:id
achievementRouter.put("/:id", Achievementvalidation_1.validateUpdateAchievement, Achievementcontroller_1.achievementController.update);
// DELETE /achievements/:id
achievementRouter.delete("/:id", Achievementvalidation_1.validateDeleteAchievement, Achievementcontroller_1.achievementController.remove);
exports.default = achievementRouter;
