import { RedisClient } from '../../../shared/redis';
import {
  eventAcademicFacultyCreated,
  eventAcademicFacultyDeleted,
  eventAcademicFacultyUpdated,
} from './academicFaculty.constant';
import { IAcademicFacultyCreatedEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const InitAcademicFacultyEvents = () => {
  RedisClient.subscribe(eventAcademicFacultyCreated, async (e: string) => {
    const data: IAcademicFacultyCreatedEvent = JSON.parse(e);
    await AcademicFacultyService.createFacultyFromEvent(data);
  });
  RedisClient.subscribe(eventAcademicFacultyUpdated, async (e: string) => {
    const data: IAcademicFacultyCreatedEvent = JSON.parse(e);
    await AcademicFacultyService.updateFacultyFromEvent(data);
  });
  RedisClient.subscribe(eventAcademicFacultyDeleted, async (e: string) => {
    const data: IAcademicFacultyCreatedEvent = JSON.parse(e);
    await AcademicFacultyService.deleteFacultyFromEvent(data);
  });
};

export default InitAcademicFacultyEvents;
