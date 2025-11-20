import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AdminResponse {
  constructor(private readonly partial?: Partial<AdminResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  message: string;
}