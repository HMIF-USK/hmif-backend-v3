"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Achievementcontroller_1 = require("../../module/achievement/Achievementcontroller");
const auth_1 = require("../../middleware/auth");
const Achievementvalidation_1 = require("../../module/achievement/Achievementvalidation");
const achievementRouter = (0, express_1.Router)();
achievementRouter.use(auth_1.verifyToken);
// POST /achievements
achievementRouter.post("/", Achievementvalidation_1.validateCreateAchievement, Achievementcontroller_1.achievementController.create);
// PUT /achievements/:id
achievementRouter.put("/:id", Achievementvalidation_1.validateUpdateAchievement, Achievementcontroller_1.achievementController.update);
// DELETE /achievements/:id
achievementRouter.delete("/:id", Achievementvalidation_1.validateDeleteAchievement, Achievementcontroller_1.achievementController.remove);
exports.default = achievementRouter;
