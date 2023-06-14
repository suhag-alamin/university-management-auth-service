import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemesterToDB
);

router.get('/', AcademicSemesterController.getAllSemesterFromDB);
router.get('/:id', AcademicSemesterController.getSingleSemesterFromDB);

router.patch(
  '/update/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemesterToDB
);

router.delete('/delete/:id', AcademicSemesterController.deleteSemesterToDB);

export const AcademicSemesterRoutes = router;
