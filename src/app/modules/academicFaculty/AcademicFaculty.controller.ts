import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

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

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAcademicFacultyFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleFacultyFromDB(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleFaculty,
};
