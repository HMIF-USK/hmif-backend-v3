"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DepartmentService_1 = __importDefault(require("./DepartmentService"));
class DepartmentController {
    getDepartments = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.getAllDepartments();
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
    getDepartmentById = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.getDepartmentById(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
    getDepartmentBySlug = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.getDepartmentBySlug(req.params.slug);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    };
    updateDepartment = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.updateDepartment(req.params.id, req.body, res);
            if (!response) {
                res.status(400).json({
                    status: 400,
                    message: "service internal error",
                });
                return;
            }
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
    addPhoto = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.addPhoto(req.params.id, req.body);
            res.status(201).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
    deletePhoto = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.deletePhoto(req.params.photoId);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
    syncPhotos = async (req, res) => {
        try {
            const response = await DepartmentService_1.default.syncPhotos(req.params.id, req.body.photos);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };
}
exports.default = new DepartmentController();
