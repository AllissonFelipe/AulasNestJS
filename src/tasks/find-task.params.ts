import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from './task.model';

export class FindTaskParams {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;
}
