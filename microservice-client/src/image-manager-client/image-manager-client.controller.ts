import { Body, Controller, Delete, Get, Inject, Logger, Param, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Controller('image-api')
export class ImageManagerClientController {
  constructor(@Inject('IMAGE_SERVICE') private readonly client: ClientProxy) { }

  private logger = new Logger();

  @Put('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile1(@UploadedFile() file, @Body() query, @Req() req) {
    try {
      this.logger.log({ message: `Client-controller: upload image name: ${file.originalname}` });
      // TODO: mongodm limit up to 16 mb change to object store like miniIo Or use package like gridfs
      if (file.size > 15800000) {
        throw { message: 'Max file size 16 mb' };
      }
      const username = req.headers['x-username'];
      if (!username) {
        throw { message: 'please use username' };
      }
      const fileId = uuidv4();

      const queryObj = {
        queryType: 'upload',
        username,
        file,
        fileId,
      };
      this.client.emit('upload-image', queryObj);
      return fileId;
    } catch (err) {
      this.logger.warn({ error: `Client-controller: couldn't view image name: ${file.originalname}` });
      return { error: err.message };

    }

  }


  @Get('/view/')
  async viewErr() {
    return { error: 'please send file id param' };
  }


  @Get('view/:fileId')
  async viewImage(@Param('fileId') fileId, @Req() req, @Res() res) {
    try {
      this.logger.log({ message: `Client-controller: view image name: ${fileId}` });
      const username = req.headers['x-username'];
      if (!username) {
        throw { message: 'please use username' };
      }
      const queryObj = {
        queryType: 'view',
        username,
        fileId,
      };
      const result: Observable<any> = await this.client.send('view-image', queryObj);
      // TODO: fix return
      result.subscribe((obj => {
        if (obj.error) {
          // res.status(404).send({ error: obj.error });
        }
        res.send(obj);
        res.end();

      }));

    } catch (err) {
      this.logger.warn({ error: `Client-controller: couldn't view image id: ${fileId}` });
      return { error: err.message };

    }
  }

  @Delete('/delete/')
  async deleteErr() {
    return { error: 'please send file id param' };
  }

  @Delete('/delete/:fileId')
  async deleteImage(@Param('fileId') fileId, @Req() req, @Res() res) {
    try {
      this.logger.log({ message: `Client-controller: view image delete: ${fileId}` });

      const username = req.headers['x-username'];
      if (!username) {
        throw { message: 'please use username' };
      }
      const queryObj = {
        queryType: 'delete',
        username,
        fileId,
      };
      // this.client.emit<any>('delete-image', queryObj);
      const result: Observable<any> = await this.client.send('delete-image', queryObj);

      result.subscribe((obj => {
        if (obj.error) {
          res.status(404).send({ error: obj.error });
          res.end();
          return;
        }
        res.send('obj');
        res.end();

      }));
    } catch (err) {
      this.logger.warn({ error: `Client-controller: couldn't delete image id: ${fileId}` });
      res.status(404).send({ error: err.message });
    }

  }

}
