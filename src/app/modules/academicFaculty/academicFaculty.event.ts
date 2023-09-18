import { RedisClient } from '../../../shared/redis';
import { eventAcademicFacultyCreated } from './academicFaculty.constant';
import { IAcademicFacultyCreatedEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const InitAcademicFacultyEvents = () => {
  RedisClient.subscribe(eventAcademicFacultyCreated, async (e: string) => {
    const data: IAcademicFacultyCreatedEvent = JSON.parse(e);
    await AcademicFacultyService.createFacultyFromEvent(data);
    console.log(data);
  });
};

export default InitAcademicFacultyEvents;
