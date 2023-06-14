import express from 'express';
import { AcademicFacultyController } from './AcademicFaculty.controller';

const router = express.Router();

router.post('/create', AcademicFacultyController.createAcademicFaculty);

export const AcademicFacultyRoutes = router;
