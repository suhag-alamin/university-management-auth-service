import { RedisClient } from '../../../shared/redis';
import { eventAcademicDepartmentCreated } from './academicDepartment.constants';
import { IAcademicDepartmentCreatedEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const InitAcademicDepartmentEvents = () => {
  RedisClient.subscribe(eventAcademicDepartmentCreated, async (e: string) => {
    const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
    await AcademicDepartmentService.createDepartmentFromEvent(data);
    console.log(data);
  });
};

export default InitAcademicDepartmentEvents;
