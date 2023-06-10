import { Schema, model } from 'mongoose';
import { AcademicModel, IAcademicSemester } from './academicSemester.interface';

const academicSchema = new Schema<IAcademicSemester, AcademicModel>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
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
