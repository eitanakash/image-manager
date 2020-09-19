import { Test, TestingModule } from '@nestjs/testing';
import { UsageReportController } from './usage-report.controller';

describe('UsageReport Controller', () => {
  let controller: UsageReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsageReportController],
    }).compile();

    controller = module.get<UsageReportController>(UsageReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
