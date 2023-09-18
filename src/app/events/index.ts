import InitAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.event';
import InitAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.event';
import InitAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  InitAcademicSemesterEvents();
  InitAcademicFacultyEvents();
  InitAcademicDepartmentEvents();
};

export default subscribeToEvents;
