import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyService } from './dummy/dummy.service';
import { MessageFormatterService } from './message-formatter/message-formatter.service';
import { LoggerService } from './logger/logger.service';
import { TasksModule } from './tasks/tasks.module';
import { appConfig } from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { appConfigSchema } from './config/config.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DummyService,
    Logger,
    MessageFormatterService,
    LoggerService,
  ],
})
export class AppModule {}
