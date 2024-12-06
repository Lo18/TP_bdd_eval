"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//définir notre schéma
const projectsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "planned" },
    createdAt: { type: Date, default: Date.now }
});
//Créer notre model
const Project = (0, mongoose_1.model)('Projects', projectsSchema);
exports.default = Project;
