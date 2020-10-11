import { Body, Controller, Get, Post } from '@nestjs/common';
import { RulesDto } from './dots/rules.dto';
import { TwitterStreamService } from './twitter-stream.service';

@Controller('twitter-stream')
export class TwitterStreamController {
  constructor(
    private readonly twitterStreamService: TwitterStreamService,
  ) { }

  @Post('rules')
  addRuls(@Body() rules: RulesDto) {
    console.log('rules');
    console.log(rules);
  }

  @Post('stream')
  getStream(@Body() rules: RulesDto) {
    console.log('stream rules');
    console.log(rules);
    const { username, keyword } = rules;
    return this.twitterStreamService.getStream(username, keyword);
  }

  @Get('rules')
  async getAllRules(): Promise<any> {
    console.log('getAllRules');
    try {
      const result = await this.twitterStreamService.getAllRules();
      return result
    } catch (error) {

    }
  }


}
