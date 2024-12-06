import { Request, Response } from "express";
import Task from "../models/Tasks";
import Project from "../models/Projects";
import { SortOrder } from "mongoose";

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.query;
        const filter: Record<string, any> = {};
        if (projectId) {
            filter.projectId = projectId; 
        }
        const tasks = await Task.find(filter).populate("projectId"); 
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId, title, done, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Titre est requis'
            })
        }

        const ProjectExists = await Project.findById(projectId);
        if (!ProjectExists) {
            return res.status(404).json({
                message: 'Projet pas trouvé'
            })
        }

        const Tasks = new Task({ title, done, dueDate, projectId });
        const savedTask = await Tasks.save();
        res.status(201).json({
            message: 'Tache créée',
            Project: savedTask
        })
    }

    catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Existe deja'
            })
        }
        console.log(error)
        return res.status(500).json({
            message: 'Erreur lors de la création de la tache',
            error: error.message
        })
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await Task.findById(req.params.id).populate("projectId");
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body;
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, updates, { new: true }).populate("projectId");

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.status(200).json({ message: 'Tâche mise à jour', task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        res.status(200).json({ message: 'Tâche supprimée', task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const markTaskAsDone = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate( id, { done: true }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche marquée comme faite', task });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getTasksDueBefore = async (req: Request, res: Response): Promise<any> => {
    try {
        const { date } = req.query;
        if (!date || isNaN(Date.parse(date as string))) {
            return res.status(400).json({ message: "Format de date invalide. Utilisez le format YYYY-MM-DD." });
        }
        const parsedDate = new Date(date as string);
        const tasks = await Task.find({ dueDate: { $lt: parsedDate } }).populate("projectId");
        return res.status(200).json(tasks);
    } catch (error: any) {
        return res.status(500).json({ message: "Erreur lors du filtrage des tâches", error: error.message });
    }
};
