import { ENUM_USER_ROLE } from '../../../enums/user';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: ENUM_USER_ROLE.STUDENT,
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: ENUM_USER_ROLE.FACULTY,
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne(
    {
      role: ENUM_USER_ROLE.ADMIN,
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id?.substring(2) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //   increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  const fullStudentID = `${academicSemester?.year?.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return fullStudentID;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  //   increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  const fullFacultyID = `F-${incrementedId}`;
  return fullFacultyID;
};
export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  //   increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  const fullAdminID = `A-${incrementedId}`;
  return fullAdminID;
};
