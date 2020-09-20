import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../schemas/image.schema';
import { Model } from 'mongoose';
import { Buffer } from 'buffer';
import { UsageReportService } from 'src/usage-report/usage-report.service';
import { QueryObjDto } from './dto/query-obj-dto';

// TODO: validation all methods
@Injectable()
export class ImageManagerService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
    private readonly usageReportService: UsageReportService,

  ) { }
  private logger = new Logger();

  async uploadImage(queryObj: QueryObjDto): Promise<any> {
    const file = queryObj.file;
    try {
      this.logger.log({ message: `App-Service: uploading image id ${queryObj.fileId}` });
      const encodeImage = file.buffer.data.toString('base64');
      const finalImg = {
        contentType: file.mimetype,
        image: Buffer.from(encodeImage, 'base64'),
      };
      const imageDoc = {
        title: file.mimetype,
        uploader: queryObj.username,
        encoding: file.encoding,
        size: file.size,
        fileId: queryObj.fileId,
        data: finalImg,
      };
      const newImage = new this.imageModel(imageDoc);
      const result = await newImage.save();
      if (result) {
        this.usageReportService.editCollections(queryObj.username, queryObj.fileId, queryObj.queryType)
      }
      return;
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }
  }

  // TODO: edit to view result of binary
  async viewImage(queryObj: QueryObjDto): Promise<any> {
    try {
      this.logger.log({ message: `App-Service: view image id ${queryObj.fileId}` });
      const result: any = await this.imageModel.findOne({ fileId: queryObj.fileId });
      if (result) {
        this.usageReportService.editCollections(queryObj.username, queryObj.fileId, queryObj.queryType)
      }
      return result.data;
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }
  }

  async deleteImage(queryObj: QueryObjDto): Promise<any> {
    try {
      this.logger.log({ message: `App-Service: deleting image id ${queryObj.fileId}` });

      const result: any = await this.imageModel.findOneAndDelete({ fileId: queryObj.fileId });

      if (result) {
        this.usageReportService.editCollections(queryObj.username, queryObj.fileId, queryObj.queryType)
      }
      return { message: `Image id ${result.fileId} deleted` };
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't delete image id ${queryObj.fileId}` });
      return { error: err.message };
    }
  }
}