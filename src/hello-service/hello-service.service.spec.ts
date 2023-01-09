import { Test, TestingModule } from '@nestjs/testing';
import { HelloServiceService } from './hello-service.service';

describe('HelloServiceService', () => {
  let service: HelloServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloServiceService],
    }).compile();

    service = module.get<HelloServiceService>(HelloServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
