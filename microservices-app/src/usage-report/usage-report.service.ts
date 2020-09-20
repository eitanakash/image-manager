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
  private uploadedImagesReport = []
  private viewedImagesReport = []
  private deletedImagesReport = []
  async getReport(date) {
    try {
      this.logger.log({ message: `App-report-service: generating report ${date}` });
      const totalImages = await this.totalImages()
      const report = {
        totalImages,
        viewedImages: this.viewedImagesReport,
        deletedImages: this.deletedImagesReport,
        uploadedImages: this.uploadedImagesReport,
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
          this.uploadedImagesReport = await this.uploadedImagesSchema.find()
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
          this.viewedImagesReport = await this.viewedImagesSchema.find();
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
          this.deletedImagesReport = await this.deletedImagesSchema.find()
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

}