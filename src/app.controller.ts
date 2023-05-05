import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Subject } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse() {
    const subject = new Subject();

    setTimeout(() => {
      Array.from(Array(1000).keys()).forEach((i) => {
        subject.next({
          data: {
            message: `Message #${i}`,
          },
        });
      });
    }, 1000);

    return subject;
  }
}
