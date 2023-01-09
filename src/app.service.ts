import { Injectable } from '@nestjs/common';
import { HelloServiceService } from './hello-service';

@Injectable()
export class AppService {
  constructor(private helloService: HelloServiceService) {}
  getHello(): string {
    this.helloService.sayHello('Henlo');
    return "hello";
  }
}
