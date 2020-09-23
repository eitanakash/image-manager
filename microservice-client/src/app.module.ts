import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { UsageReportModule } from './usage-report/usage-report.module';
import { ImageManagerClientService } from './image-manager-client/image-manager-client.service';
import { ImageManagerClientModule } from './image-manager-client/image-manager-client.module';
import { env } from '../env';

@Module({
  imports: [
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
    UsageReportModule,
    ImageManagerClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageManagerClientService],
})
export class AppModule {

}
