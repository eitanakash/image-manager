import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '../env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.APP_PORT);
  console.log(`Listening on port: ${env.APP_PORT}`);

}
bootstrap();
