import { RedisClient } from '../../../shared/redis';
import {
  eventAcademicSemesterCreated,
  eventAcademicSemesterUpdated,
} from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const InitAcademicSemesterEvents = () => {
  RedisClient.subscribe(eventAcademicSemesterCreated, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
  });
  RedisClient.subscribe(eventAcademicSemesterUpdated, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.updateSemesterFromEvent(data);
  });
};

export default InitAcademicSemesterEvents;
