import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageManagerController } from './image-manager.controller';
import { ImageManagerService } from './image-manager.service';
import { ImageSchema } from '../schemas/image.schema';
import { UsageReportModule } from 'src/usage-report/usage-report.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    UsageReportModule,
  ],
  controllers: [ImageManagerController],
  providers: [ImageManagerService],
  exports: [ImageManagerService],
})
export class ImageManagerModule { }