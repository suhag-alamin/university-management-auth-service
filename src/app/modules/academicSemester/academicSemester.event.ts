import { RedisClient } from '../../../shared/redis';
import { eventAcademicSemesterCreated } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const InitAcademicSemesterEvents = () => {
  RedisClient.subscribe(eventAcademicSemesterCreated, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
    console.log(data);
  });
};

export default InitAcademicSemesterEvents;
