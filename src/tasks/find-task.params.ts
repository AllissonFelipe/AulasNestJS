/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IsEnum, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from './task.model';
import { Transform } from 'class-transformer';

export class FindTaskParams {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }: { value?: string }) => {
    if (!value) return undefined;

    return value
      .split(',')
      .map((label) => label.trim())
      .filter((label) => label.length);
  })
  labels?: string[];

  @IsOptional()
  @IsIn(['createdAt', 'title', 'status'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
