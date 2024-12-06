import { Router } from "express";
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask, markTaskAsDone, getTasksDueBefore } from "../controllers/tasksController";

const router = Router();

router.post('/Tasks', createTask);
router.get('/Tasks',getAllTasks);
router.get('/Tasks/due-before', getTasksDueBefore);
router.get('/Tasks/:id',getTaskById);
router.put('/Tasks/:id',updateTask);
router.delete('/Tasks/:id',deleteTask);
router.post('/Tasks/:id/mark-done', markTaskAsDone);

export default router;