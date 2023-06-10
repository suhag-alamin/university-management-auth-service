import { Schema, model } from 'mongoose';
import { AcademicModel, IAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';

const academicSchema = new Schema<IAcademicSemester, AcademicModel>(
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

export const AcademicSemester = model<IAcademicSemester, AcademicModel>(
  'AcademicSemester',
  academicSchema
);
