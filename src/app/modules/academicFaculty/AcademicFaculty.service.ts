import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicFacultySearchableFields,
  academicFacultyTitleMapper,
} from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyCreatedEvent,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  if (academicFacultyTitleMapper.includes(payload.title)) {
    const result = await AcademicFaculty.create(payload);
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Faculty!');
  }
};

const getAcademicFacultyFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const andCondition = [];
  const { searchTerm, ...filtersData } = filters;

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateFacultyToDB = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const createFacultyFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.create({
    title: e.title,
    syncId: e.id,
  });
};
const updateFacultyFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    {
      syncId: e.id,
    },
    e,
    {
      new: true,
    }
  );
};
const deleteFacultyFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.deleteOne({
    syncId: e.id,
  });
};

export const AcademicFacultyService = {
  createAcademicFacultyToDB,
  getAcademicFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDB,
  deleteFacultyFromDB,
  createFacultyFromEvent,
  updateFacultyFromEvent,
  deleteFacultyFromEvent,
};
