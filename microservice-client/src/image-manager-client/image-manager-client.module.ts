import { Module } from '@nestjs/common';
import { ImageManagerClientController } from './image-manager-client.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { env } from '../../env';

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
  ],
  controllers: [ImageManagerClientController]
})
export class ImageManagerClientModule { }
