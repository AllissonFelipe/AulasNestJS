/* eslint-disable prettier/prettier */

import { AuthConfig } from '../config/auth.config';
import { TypedConfigService } from '../config/typed-config.services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordService } from './password/password.service';
import { UserService } from './user/user.service';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService) =>
        ({
          secret: config.get<AuthConfig>('auth')?.jwt.secret,
          signOptions: {
            expiresIn: config.get<AuthConfig>('auth')?.jwt.expiresIn,
          },
        }) as JwtModuleOptions,
    }),
  ],
  providers: [
    PasswordService,
    UserService,
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class UsersModule {}
