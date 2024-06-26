import { Router } from "express";
import { ProjectController } from "../controllers/Project.controller";
import { body, param } from "express-validator";
import { handleInputErros } from "../middlewares/validators";
import { TaskController } from "../controllers/Tasks.controller";
import { ProjectExists } from "../middlewares/projects";
import { TaskExists, TasksBelongToProject } from "../middlewares/tasks";

const router = Router()

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('id not valid'),
    handleInputErros,
    ProjectController.getProjectById),

    router.put('/:id',
        param('id').isMongoId().withMessage('id not valid'),
        body('projectName').notEmpty().withMessage('must not empty'),
        body('clientName').notEmpty().withMessage('must not empty'),
        body('description').notEmpty().withMessage('must not empty'),
        handleInputErros, ProjectController.updateProject)

router.post('/',
    body('projectName').notEmpty().withMessage('must not empty'),
    body('clientName').notEmpty().withMessage('must not empty'),
    body('description').notEmpty().withMessage('must not empty'),
    handleInputErros,
    ProjectController.createProject
)
router.delete('/:id',
    param('id').isMongoId().withMessage('id not valid'),
    handleInputErros,
    ProjectController.deleteProjectById
)

// rouets for task
router.param('projectId', ProjectExists)
router.param('taskId', TaskExists)
router.param('taskId', TasksBelongToProject);

router.post('/:projectId/tasks',
    body('name').notEmpty().withMessage("name not empty"),
    body('description').notEmpty().withMessage('description not empty'),
    handleInputErros,
    TaskController.createTask)

router.get('/:projectId/tasks', TaskController.getTaskByProject);

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id not valid'),
    handleInputErros, TaskController.getTaskById);

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id not valid'),
    handleInputErros, TaskController.upateTask)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id not valid'),
    handleInputErros, TaskController.deleteTaskById)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('id not valid'),
    body('status').notEmpty().withMessage('status not must empty'),
    handleInputErros, TaskController.updateTaskStatus)
export default router