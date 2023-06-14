import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './AcademicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;

    const result = await AcademicFacultyService.createAcademicFacultyToDB(
      academicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
};
