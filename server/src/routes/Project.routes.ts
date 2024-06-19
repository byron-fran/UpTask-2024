import { Router } from "express";
import { ProjectController } from "../controllers/Project.controller";
import { body, param } from "express-validator";
import { handleInputErros } from "../middlewares/validators";

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
export default router