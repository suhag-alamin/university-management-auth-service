import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemesterToDB
);

router.get('/get-semester', AcademicSemesterController.getAllSemesterFromDB);
router.get(
  '/get-semester/:id',
  AcademicSemesterController.getSingleSemesterFromDB
);

router.patch(
  '/update-semester/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemesterToDB
);

export const AcademicSemesterRoutes = router;
