import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hi() {
    console.log('message from the other world in console');
    return 'message from the other world';
  }
}
