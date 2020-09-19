import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: 'mongodb://localhost/yourDB',
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          console.log('111111');
          console.log('file in ');
          console.log(file);

          const filename = file.originalname.trim();
          const fileInfo = {
            filename,
          };
          console.log('fileInfo');
          console.log(fileInfo);
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    console.log('createMulterOptions');

    return {
      storage: this.gridFsStorage,
    };
  }
}
