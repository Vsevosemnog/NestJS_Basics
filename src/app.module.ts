import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AccountController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: 'cats', method: RequestMethod.ALL}); //.forRoutes(CatsController);
    // Doesn`t work that way
    //consumer.apply(LoggerMiddleware).exclude({path: 'cats', method: RequestMethod.POST});
  }
}
