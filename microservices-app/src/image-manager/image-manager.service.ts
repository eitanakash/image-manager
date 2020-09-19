import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../schemas/image.schema';
import { Model } from 'mongoose';
import { Buffer } from 'buffer';
import { UsageReportService } from 'src/usage-report/usage-report.service';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class ImageManagerService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
    private readonly usageReportService: UsageReportService,

  ) { }
  private logger = new Logger();


  async uploadImage(queryObj) {
    const file = queryObj.file;
    try {
      this.logger.log({ message: `App-Service: uploading image id ${queryObj.fileId}` });


      console.log('file: ', file);
      const encodeImage = file.buffer.data.toString('base64');

      const finalImg = {
        contentType: file.mimetype,
        image: Buffer.from(encodeImage, 'base64'),
      };
      const file1 = {

        title: file.mimetype,
        description: file.encoding,
        size: file.size,
        fileId: queryObj.fileId,
        data: finalImg, //Buffer.from(file.buffer.data),
      };

      const newImage = new this.imageModel(file1);
      const result = await newImage.save();
      return result.id as string;
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }

  }

  async viewImage(queryObj): Promise<any> {
    try {
      this.logger.log({ message: `App-Service: view image id ${queryObj.fileId}` });
      const result: any = await this.imageModel.findOne({ fileId: queryObj.fileId });
      console.log('result');
      console.log(result);
      return result.data;
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't view image id ${queryObj.fileId}` });
      return { error: err.message };
    }

  }
  async deleteImage(queryObj): Promise<any> {
    try {
      this.logger.log({ message: `App-Service: deleting image id ${queryObj.fileId}` });

      const result: any = await this.imageModel.findOneAndDelete({ fileId: queryObj.fileId });

      return { message: `Image id ${result.fileId} deleted` };
    } catch (err) {
      this.logger.warn({ error: `App-Service: couldn't delete image id ${queryObj.fileId}` });
      return { error: err.message };

    }

  }

}