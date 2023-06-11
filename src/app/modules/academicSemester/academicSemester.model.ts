import { Schema, model } from 'mongoose';
import { AcademicModel, IAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';
import status from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester, AcademicModel>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicModel>(
  'AcademicSemester',
  academicSemesterSchema
);
