import { AcademicFaculty } from './AcademicFaculty.model';
import { IAcademicFaculty } from './academicFaculty.interface';

const createAcademicFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyToDB,
};
