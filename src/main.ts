import { ContextIdFactory, HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';
import { AggregateByTenantContextIdStrategy } from './strategies';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  //const httpAdapter  = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();