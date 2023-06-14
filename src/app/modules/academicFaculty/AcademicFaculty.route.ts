import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get('/', AcademicFacultyController.getAcademicFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);

export const AcademicFacultyRoutes = router;
