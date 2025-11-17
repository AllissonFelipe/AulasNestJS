import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task.model';

export class FindTaskParams {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
