import { RedisClient } from '../../../shared/redis';
import {
  eventAcademicDepartmentCreated,
  eventAcademicDepartmentDeleted,
  eventAcademicDepartmentUpdated,
} from './academicDepartment.constants';
import { IAcademicDepartmentCreatedEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const InitAcademicDepartmentEvents = () => {
  RedisClient.subscribe(eventAcademicDepartmentCreated, async (e: string) => {
    const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
    await AcademicDepartmentService.createDepartmentFromEvent(data);
  });
  RedisClient.subscribe(eventAcademicDepartmentUpdated, async (e: string) => {
    const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
    await AcademicDepartmentService.updateDepartmentFromEvent(data);
  });
  RedisClient.subscribe(eventAcademicDepartmentDeleted, async (e: string) => {
    const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
    await AcademicDepartmentService.deleteDepartmentFromEvent(data);
  });
};

export default InitAcademicDepartmentEvents;
