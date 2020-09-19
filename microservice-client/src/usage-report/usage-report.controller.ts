import { Controller, Get, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller('usage-report')
export class UsageReportController {

  constructor(@Inject('IMAGE_SERVICE') private readonly client: ClientProxy) { }

  private logger = new Logger();

  @Get()
  generateReport() {
    const date = new Date();

    this.logger.log({ message: 'generating report' });
    return this.client.send('generate-report', date);

  }
}
