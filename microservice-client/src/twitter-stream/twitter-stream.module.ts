import { Module } from '@nestjs/common';
import { TwitterStreamController } from './twitter-stream.controller';
import { TwitterStreamService } from './twitter-stream.service';

@Module({
  controllers: [TwitterStreamController],
  providers: [TwitterStreamService],
})
export class TwitterStreamModule {}
