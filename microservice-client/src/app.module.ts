import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UsageReportModule } from './usage-report/usage-report.module';
import { ImageManagerClientService } from './image-manager-client/image-manager-client.service';
import { ImageManagerClientModule } from './image-manager-client/image-manager-client.module';

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
    MongooseModule.forRoot('mongodb://localhost/yourDB'),
    // MongooseModule.forRoot(process.env.DB_URL),
    UsageReportModule,
    ImageManagerClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageManagerClientService],
})
export class AppModule {

}
