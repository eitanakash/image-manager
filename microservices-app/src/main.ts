import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { env } from '../env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}/${env.RABBITMQ_VHOST}`],
      queue: `${env.RABBITMQ_QUEUE}`,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
