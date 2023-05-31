import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Subject, bufferCount, bufferTime, interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse() {
    return interval(0).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
