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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.createTask = exports.getAllTasks = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
const Projects_1 = __importDefault(require("../models/Projects"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Projects = yield Tasks_1.default.find().populate("projectId");
        res.status(200).json(Projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, title, done, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({
                message: 'Titre est requis'
            });
        }
        const ProjectExists = yield Projects_1.default.findById(projectId);
        if (!ProjectExists) {
            return res.status(404).json({
                message: 'Projet pas trouvé'
            });
        }
        const Tasks = new Tasks_1.default({ title, done, dueDate, projectId });
        const savedTask = yield Tasks.save();
        res.status(201).json({
            message: 'Tache créée',
            Project: savedTask
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Existe deja'
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Erreur lors de la création de la tache',
            error: error.message
        });
    }
});
exports.createTask = createTask;
//
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Projects = yield Projects_1.default.findById(req.params.id);
        res.status(200).json(Projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const { id } = req.params;
        const Projects = yield Projects_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!Projects) {
            return res.status(404).json({ message: 'Tache pas trouvée' });
        }
        res.status(200).json({ message: 'Tache mise à jour', Projects: Projects_1.default });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Projects = yield Projects_1.default.findByIdAndDelete(id);
        if (!Projects) {
            return res.status(404).json({ message: 'Tache pas trouvée' });
        }
        res.status(200).json({ message: 'Tache supprimée', Projects: Projects_1.default });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
const searchTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, startDate, endDate, sort = 'createdAt', order = 'asc', page, limit } = req.query;
        const filter = {};
        if (q) {
            filter.$text = { $search: q };
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }
        const sortOrder = { [sort]: order === 'asc' ? 1 : -1 };
        const skip = (Number(page) - 1) * Number(limit);
        const Tasks = yield Tasks_1.default.find(filter)
            .sort(sortOrder)
            .skip(skip)
            .limit(Number(limit))
            .populate("projectId");
        res.status(200).json(Tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchTask = searchTask;
