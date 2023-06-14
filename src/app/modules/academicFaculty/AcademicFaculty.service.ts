import { IGenericResponse } from '../../../interfaces/common';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultyFromDB = async (): Promise<
  IGenericResponse<IAcademicFaculty[]>
> => {
  const result = await AcademicFaculty.find();

  return {
    data: result,
  };
};

export const AcademicFacultyService = {
  createAcademicFacultyToDB,
  getAcademicFacultyFromDB,
};
