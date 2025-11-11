import { Body, Injectable } from '@nestjs/common';
import * as taskModel from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

@Injectable()
export class TasksService {
  private tasks: taskModel.ITask[] = [];

  public findAll(): taskModel.ITask[] {
    return this.tasks;
  }
  public findOne(id: string): taskModel.ITask | undefined {
    return this.tasks.find((task) => task.id === id);
  }
  public create(@Body() createTaskDto: CreateTaskDto): taskModel.ITask {
    const task: taskModel.ITask = {
      id: randomUUID(),
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }
  public updateTask(
    task: taskModel.ITask,
    updateTaskDto: UpdateTaskDto,
  ): taskModel.ITask {
    if (
      updateTaskDto.status &&
      !this.isValidStatusTransition(task.status, updateTaskDto.status)
    ) {
      throw new WrongTaskStatusException();
    }
    Object.assign(task, updateTaskDto);
    return task;
  }
  public deleteTask(task: taskModel.ITask): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id != task.id,
    );
  }
  private isValidStatusTransition(
    currentStatus: taskModel.TaskStatus,
    newStatus: taskModel.TaskStatus,
  ): boolean {
    const statusOrder = [
      taskModel.TaskStatus.OPEN,
      taskModel.TaskStatus.IN_PROGRESS,
      taskModel.TaskStatus.DONE,
    ];
    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }
}
