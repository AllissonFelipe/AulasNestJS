import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PasswordService } from '../password/password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PasswordService,
        {
          provide: getRepositoryToken(User), // ✅ mock do repositório
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            // adicione outros métodos usados pelo UserService
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
