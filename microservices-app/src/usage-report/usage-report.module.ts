import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsageReportService } from './usage-report.service';
import { UploadedImagesSchema } from 'src/schemas/uploaded-images.schema';
import { UsageReportController } from './usage-report.controller';
import { ImageSchema } from 'src/schemas/image.schema';
import { ViewedImagesSchema } from 'src/schemas/viewed-images.schema';
import { DeletedImagesSchema } from 'src/schemas/deleted-images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UploadedImages', schema: UploadedImagesSchema }]),
    MongooseModule.forFeature([{ name: 'ViewedImages', schema: ViewedImagesSchema }]),
    MongooseModule.forFeature([{ name: 'DeletedImages', schema: DeletedImagesSchema }]),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ UsageReportService],
  exports: [ UsageReportModule, UsageReportService],
  controllers: [UsageReportController],

})export class UsageReportModule {}
