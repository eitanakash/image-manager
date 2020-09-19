import { Module } from '@nestjs/common';
import { ImageManagerClientController } from './image-manager-client.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
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
    // MongooseModule.forRoot('mongodb://localhost/yourDB'),
    // ,
    // UsageReportModule,

  ],
  controllers: [ImageManagerClientController]
})
export class ImageManagerClientModule { }
