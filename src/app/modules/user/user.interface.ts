/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  profileImage?: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethods = {
  // isUserExist(id: string): Promise<Partial<IUser> | null>;
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'needPasswordChange' | 'role'
  > | null>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
