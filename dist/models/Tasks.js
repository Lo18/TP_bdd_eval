"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//définir notre schéma
const tasksSchema = new mongoose_1.Schema({
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    dueDate: { type: Date }
});
tasksSchema.index({ title: 'text' });
//Créer notre model
const Task = (0, mongoose_1.model)('Tasks', tasksSchema);
exports.default = Task;
