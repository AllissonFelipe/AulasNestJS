import { Controller, Get, Param } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  public findAll(): string[] {
    return [`A`, `B`];
  }

  @Get('/:id')
  public findOne(@Param('id') id: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return `The number is ${id}`;
  }
}
