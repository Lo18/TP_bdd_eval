import {Request, Response} from "express";
import Project from "../models/Projects";

export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {   
    const {name, description} = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Nom requis'
        })
    }
    const newProject = new Project({name, description});
    const saveProject = await newProject.save();
    res.status(201).json({message: 'Projet créé', Project: saveProject})
}
    catch (error: any) {
        return res.status(500).json({
            message: 'Erreur lors de la création',
            error: error.message
        })
}}

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const Projects = await Project.find();
        res.status(200).json(Projects)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const Projects = await Project.findById(req.params.id);
        res.status(200).json(Projects)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body
        const { id } = req.params
        const Projects = await Project.findByIdAndUpdate(id, updates, {new: true});

        if (!Projects) {
            return res.status(404).json({message: 'Projet pas trouvé'})
        }

        res.status(200).json({message: 'Projet mis à jour', Projects: Project})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
        
}

//supprime le projet mais pas les taches qui lui sont associées
export const deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const Projects = await Project.findByIdAndDelete(id);

        if (!Projects) {
            return res.status(404).json({message: 'Projet pas trouvé'})
        }

        res.status(200).json({message: 'Projet supprimé', Projects: Project})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const completeProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        project.status = 'completed';
        await project.save();

        res.status(200).json({ message: 'Projet marqué comme complété', project });
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: error.message });
    }
}

export const getProjectsByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { status } = req.query;

        if (!status) {
            return res.status(400).json({ message: "Le statut est requis" });
        }

        const Projects = await Project.find({ status });
        res.status(200).json(Projects);
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets', error: error.message });
    }
};