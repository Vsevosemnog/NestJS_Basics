import { HelloServiceService } from './hello-service';
export declare class AppService {
    private helloService;
    constructor(helloService: HelloServiceService);
    getHello(): string;
}
