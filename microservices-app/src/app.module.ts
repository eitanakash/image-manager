import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageManagerModule } from './image-manager/image-manager.module';
import { UsageReportModule } from './usage-report/usage-report.module';
import { env } from '../env';

@Module({
  imports: [
    ImageManagerModule,
    // MongooseModule.forRoot(`${env.MONGODB_URI}`),
    MongooseModule.forRoot(process.env.DB_URL),
    UsageReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
