import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from 'src/schemas/report.schema';
import { EventPattern } from '@nestjs/microservices';
import { report } from './mock-report';


@Injectable()
export class UsageReportService {
  constructor(
    @InjectModel('Report') private readonly reportModel: Model<Report>,
  ) { }

  private logger = new Logger();
  async getReport(date) {
    try {
      this.logger.log({ message: `App-report-service: generating report ${date}` });
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
}
