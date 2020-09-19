import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

import { MongooseModule } from '@nestjs/mongoose';
import { UsageReportController } from './usage-report.controller';
import { UsageReportService } from './usage-report.service';

@Module({
  imports: [
    UsageReportModule,
    ClientsModule.register([
      {
        name: 'IMAGE_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/images'],
          queue: 'image-messages',
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