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
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const Projects_1 = __importDefault(require("../models/Projects"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status, createdAt } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'Nom requis'
            });
        }
        const newProject = new Projects_1.default({ name, description, status });
        yield newProject.save();
        res.status(201).json({ message: 'Projet créé', newProject });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Erreur lors de la création',
            error: error.message
        });
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Projects = yield Projects_1.default.find();
        res.status(200).json(Projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Projects = yield Projects_1.default.findById(req.params.id);
        res.status(200).json(Projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const { id } = req.params;
        const Projects = yield Projects_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!Projects) {
            return res.status(404).json({ message: 'Projet pas trouvé' });
        }
        res.status(200).json({ message: 'Projet mis à jour', Projects: Projects_1.default });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Projects = yield Projects_1.default.findByIdAndDelete(id);
        if (!Projects) {
            return res.status(404).json({ message: 'Projet pas trouvé' });
        }
        res.status(200).json({ message: 'Projet supprimé', Projects: Projects_1.default });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProject = deleteProject;
