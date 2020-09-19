import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UsageReportService } from './usage-report.service';


@Controller('usage-report')
export class UsageReportController {

  constructor(
    private readonly usageReportService: UsageReportService,

  ) { }



  private logger = new Logger();


  @EventPattern('generate-report')
  async getReport(date) {
    try {
      this.logger.log({ message: `App-report-controller: generating report` });
      return await this.usageReportService.getReport(date);

    } catch (err) {
      this.logger.warn({ error: `App-report-controller: couldn't generate report` });
      return { error: err.message };
    }
  }
}
