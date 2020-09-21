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
  ) { }

  private logger = new Logger();
  // TODO: remove from report redundant felids
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

  async editCollections(username, fileId, queryType) {
    let Doc;
    let userData;
    let result;

    try {
      this.logger.log({ message: `App-report-service: editing ${queryType} collection` });
      switch (queryType) {
        case 'upload':
          userData = await this.uploadedImagesSchema.findOne({ username: username });
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
          break;

        case 'view':
          userData = await this.viewedImagesSchema.findOne({ username: username });
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
          break;

        case 'delete':
          userData = await this.deletedImagesSchema.findOne({ username: username });
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
          // TODO: remove fileId from all list if needed
          break;
      }

    } catch (err) {
      this.logger.warn({ error: `App-report-service: couldn't edit ${queryType} collection` });
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