import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeletedImages } from 'src/schemas/deleted-images.schema';
import { UploadedImages } from 'src/schemas/uploaded-images.schema';
import { ViewedImages } from 'src/schemas/viewed-images.schema';
import { Image } from '../schemas/image.schema';

@Injectable()
export class UsageReportService {
  constructor(
    @InjectModel('UploadedImages') private readonly uploadedImagesSchema: Model<UploadedImages>,
    @InjectModel('ViewedImages') private readonly viewedImagesSchema: Model<ViewedImages>,
    @InjectModel('DeletedImages') private readonly deletedImagesSchema: Model<DeletedImages>,
    @InjectModel('Image') private readonly imageModel: Model<Image>,

    // private readonly imageManagerService: ImageManagerService,

  ) { }

  private logger = new Logger();
  async getReport(date) {
    try {
      this.logger.log({ message: `App-report-service: generating report ${date}` });
      const totalImages = await this.totalImages()
      const uploadedImages = await this.uploadedImages()
      const viewedImages = await this.viewedImages()
      const deletedImages = await this.deletedImages()
      const report = {
        totalImages,
        uploadedImages,
        viewedImages,
        deletedImages,

      }

      return report;

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't generate report` });
      return { error: err.message };
    }
  }

  async editReport(queryObj) {
    try {
      this.logger.log({ message: `App-report-service: editing report` });
      const file1 = {
        title: 'titel1111',
      }
      let result;
      switch (queryObj.queryType) {
        case 'upload':

          console.log('upload');
          // result = await this.reportModel.updateOne()
          break;
        case 'view':
          console.log('view');
          // result = await this.reportModel.findOneAndUpdate({ views: queryObj.username }, { $inc: { views: 1 } })
          break;
        case 'delete':
          console.log('delete');

          break;

        default:
          break;
      }
      // const newImage = new this.reportModel(file1);
      // const result = await newImage.save();
      return result;

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't edit report` });
      return { error: err.message };
    }
  }

// TODO: delete from list if image deleted?
  async editUploderCollection(username, fileId) {
    try {
      this.logger.log({ message: `App-report-service: editing uploder list of username: ${username}` });
      let Doc;
      let result;

      const userData: any = await this.uploadedImagesSchema.findOne({ username: username });
      if (userData) {
        const valuesList = userData.imagesList;
        const newImagesList = [...valuesList, fileId];
        result = await this.uploadedImagesSchema.findOneAndUpdate({ username: username }, { imagesList: newImagesList });
      } else {
        Doc = {
          username,
          imagesList: [fileId],
        };
        const newDoc = new this.uploadedImagesSchema(Doc);
        result = await newDoc.save();
      }
      return result

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't edit uploder list of username: ${username }`});
      return { error: err.message };
    }
  }

// TODO: edit list of string to list of views obj {fileID: number}
  async editViewedImagesCollection(username, fileId) {
    try {
      this.logger.log({ message: `App-report-service: editing viewed images list of username: ${username}` });
      let Doc;
      let result;

      const userData: any = await this.viewedImagesSchema.findOne({ username: username });
      if (userData) {
        const valuesList = userData.imagesList;
        const newImagesList = [...valuesList, fileId];
        result = await this.viewedImagesSchema.findOneAndUpdate({ username: username }, { imagesList: newImagesList });
      } else {
        Doc = {
          username,
          imagesList: [fileId],
        };
        const newDoc = new this.viewedImagesSchema(Doc);
        result = await newDoc.save();
      }
      return result

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't edit viewed images list of username: ${username }`});
      return { error: err.message };
    }
  }

  async editDeletedImagesCollection(username, fileId) {
    try {
      this.logger.log({ message: `App-report-service: editing deleted images list of username: ${username}` });
      let Doc;
      let result;

      const userData: any = await this.deletedImagesSchema.findOne({ username: username });
      if (userData) {
        const valuesList = userData.imagesList;
        const newImagesList = [...valuesList, fileId];
        result = await this.deletedImagesSchema.findOneAndUpdate({ username: username }, { imagesList: newImagesList });
      } else {
        Doc = {
          username,
          imagesList: [fileId],
        };
        const newDoc = new this.deletedImagesSchema(Doc);
        result = await newDoc.save();
      }
      return result

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't edit deleted images list of username: ${username }`});
      return { error: err.message };
    }
  }


  async totalImages(): Promise<any> {
    try {
      this.logger.log({ message: `App-report-service: get totalImages` });
      const result: any = await this.imageModel.find();
      return result.length;
    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't get totalImages ` });
      return { error: err.message };
    }

  }
  async uploadedImages(): Promise<any> {
    try {
      this.logger.log({ message: `App-report-service: get uploder list for Report` });
      const result: any = await this.uploadedImagesSchema.find();
      return result;
    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't get viewed images list for Report` });
      return { error: err.message };
    }

  }
  async viewedImages(): Promise<any> {
    try {
      this.logger.log({ message: `App-report-service: get viewed images list for Report` });
      const result: any = await this.viewedImagesSchema.find();
      return result;
    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't get uploder list for Report` });
      return { error: err.message };
    }
  }

  async deletedImages(): Promise<any> {
    try {
      this.logger.log({ message: `App-report-service: get deleted images list for Report` });
      const result: any = await this.deletedImagesSchema.find();
      return result;
    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't get deleted images list for Report` });
      return { error: err.message };
    }
  }
}
