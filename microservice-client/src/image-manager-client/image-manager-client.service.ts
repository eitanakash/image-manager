import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageManagerClientService {
  addView(){
    console.log('in service');
    
  }
}
