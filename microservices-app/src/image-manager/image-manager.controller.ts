import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImageManagerService } from './image-manager.service';
import { UsageReportService } from 'src/usage-report/usage-report.service';

// TODO: dto validation all methods
// TODO: return type validation all methods
// TODO: check all types validation all methods

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
      this.logger.log({ message: `App-Controller: uploading image id ${queryObj.fileId}` });

      this.imageManagerService.uploadImage(queryObj);
      return;
    } catch (err) {
      this.logger.warn({ error: `App-Controller: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }

  }

  @EventPattern('view-image')
  async viewImage(queryObj) {
    try {
      this.logger.log({ message: `App-Controller: view image id ${queryObj.fileId}` });
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
      return await this.imageManagerService.deleteImage(queryObj);
    } catch (err) {
      this.logger.warn({ error: `App-Controller: couldn't view image id ${queryObj.fileId}` });
      throw { error: err.message };
    }

  }
}