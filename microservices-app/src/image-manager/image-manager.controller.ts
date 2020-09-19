import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImageManagerService } from './image-manager.service';
import { UsageReportService } from 'src/usage-report/usage-report.service';


@Controller('image-manager')
export class ImageManagerController {

  constructor(
    private readonly imageManagerService: ImageManagerService,
    private readonly usageReportService: UsageReportService,
  ) { }

  private logger = new Logger();

  @EventPattern('upload-image')
  async uploadImage(queryObj) {
    try {
      // this.usageReportService.editReport(queryObj);
      this.logger.log({ message: `App-Controller: uploading image id ${queryObj.fileId}` });

      console.log('data2');
      console.log(queryObj);
      this.imageManagerService.uploadImage(queryObj);
      return 'uploadFile1';
    } catch (err) {
      this.logger.warn({ error: `App-Controller: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }

  }

  @EventPattern('view-image')
  async viewImage(queryObj) {
    try {
      this.logger.log({ message: `App-Controller: view image id ${queryObj.fileId}` });

      console.log(queryObj);
      return await this.imageManagerService.viewImage(queryObj);
    } catch (err) {
      this.logger.warn({ error: `App-Controller: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }


  }

  @EventPattern('delete-image')
  async deleteImage(queryObj) {
    try {
      this.logger.log({ message: `deleting image id ${queryObj.fileId}` });

      console.log('App-Controller: deleteImage controller');
      console.log(queryObj);
      return await this.imageManagerService.deleteImage(queryObj);
    } catch (err) {
      this.logger.warn({ error: `App-Controller: couldn't view image id ${queryObj.fileId}` });
      throw { error: err.message };
    }

  }
}