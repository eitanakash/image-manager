import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

import { UsageReportController } from './usage-report.controller';
import { UsageReportService } from './usage-report.service';
import { env } from '../../env';

@Module({
  imports: [
    UsageReportModule,
    ClientsModule.register([
      {
        name: 'IMAGE_SERVICE', transport: Transport.RMQ,
        options: {
          urls: [`amqp://guest:guest@${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}`],
          queue: `${env.RABBITMQ_QUEUE}`,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsageReportController],
  providers: [UsageReportService],
  exports: [UsageReportModule],

})
export class UsageReportModule { }