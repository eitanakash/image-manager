import { Test, TestingModule } from '@nestjs/testing';
import { UsageReportService } from './usage-report.service';

describe('UsageReportService', () => {
  let service: UsageReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageReportService],
    }).compile();

    service = module.get<UsageReportService>(UsageReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
