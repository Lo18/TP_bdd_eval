import { Router } from "express";
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject, completeProject, getProjectsByStatus } from "../controllers/projectsController";

const router = Router();

router.post('/Projects', createProject);
router.get('/Projects', getAllProjects); 
router.get('/Projects/by-status', getProjectsByStatus);
router.get('/Projects/:id', getProjectById);
router.put('/Projects/:id', updateProject);
router.delete('/Projects/:id', deleteProject);
router.post('/Projects/:id/complete', completeProject);


export default router;