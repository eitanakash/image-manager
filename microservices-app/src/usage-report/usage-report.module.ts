import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsageReportService } from './usage-report.service';
import { ReportSchema } from 'src/schemas/report.schema';
import { UsageReportController } from './usage-report.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
    UsageReportModule,
  ],
  providers: [ UsageReportService],
  exports: [ UsageReportModule, UsageReportService],
  controllers: [UsageReportController],

})export class UsageReportModule {}
