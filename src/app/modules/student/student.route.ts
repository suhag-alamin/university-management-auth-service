import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/update/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/delete/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
