import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
// import { DataStoreService } from './database/data-store.service';
import { ImageManagerService } from './image-manager/image-manager.service';

@Controller()
export class AppController {
  constructor(
    // private readonly imageManagerService: ImageManagerService,
    // private readonly dataStoreService: DataStoreService,
    ) { }


  // @EventPattern('message_printed')
  // async handleMessagePrinted(data: Record<string, unknown>) {
  //   // report.service
  //   // up/view/.service
  //   const temp = {
  //     name: 'fasf',
  //     id: 'fasf',
  //     data: 'fasf',
  //   }
  //   console.log('safasf');
    
  //   // this.dataStoreService.connect();
  //   // this.dataStoreService.create('lalala');
  //   // this.imageManagerService.create(temp);

  //   console.log(data.text);
  // }

  /**
 * @name getFileById
 * @public
 * @async
 * @description Retrieves a file by its id (IFileInfo.fileId) from the objects server
 * @description If file hadn't been downloaded yet, publish request on Bull(redis) worker queue, named DownlodRequests
 * @param fileRequest @type IFileRequest
 * @returns the DownloadUpdate by firing the observer
 */

}
