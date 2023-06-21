import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/', ManagementDepartmentController.getAllDepartments);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);

router.patch(
  '/update/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete('/delete/:id', ManagementDepartmentController.deleteDepartment);

export const ManagementDepartmentRoutes = router;
