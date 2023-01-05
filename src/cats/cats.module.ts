import { Injectable, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Connection } from './constants';

const mockCatsService = {
    // implementation
};

/* 
    should implement
const configServiceProvider = {
    provide: ConfigService,
    useClass:
      process.env.NODE_ENV === 'development'
        ? DevelopmentConfigService
        : ProductionConfigService,
  }; */

/* 
  const connectionProvider = {

    provide: 'CONNECTION',
    useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
        const options = optionsProvider.get();
        return new DatabaseConnection(options);
    }
    inject: [OptionsProvider, {token: 'SomeOptionalProvider', optional: true}],
    //       \_____________/            \__________________/
    //        This provider              The provider with this
    //        is mandatory.              token can resolve to `undefined`.
  } */


@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

const configFactory = {
    provide: 'CONFIG',
    useFactory: () => {
        return null;
        //return process.env.NODE_ENV ==='development' ? devConfig: prodConfig;
    }
}

/* const connectionFactory = {
    provide: 'CONNECTION',
    useFactory: (optionsProvider: OptionsProvider) => {
      const options = optionsProvider.get();
      return new DatabaseConnection(options);
    },
    inject: [OptionsProvider],
  }; */

@Module({
    controllers: [CatsController],
    //providers: [CatsService],
    providers: [
        LoggerService, loggerAliasProvider, configFactory,
        //connectionProvider,
        //OptionsProvider,
        // { provide: 'SomeOptionalProvider', useValue: 'anything' },
        //configServiceProvider,
        {
            provide: CatsService,
            useClass: CatsService
            //useValue: Connection,
            //useValue: mockCatsService,
        },
        {
            provide: 'CONNECTION',
            useValue: Connection,
        },
        // Async Provider in order to establish connection before accepting requests
        {
            provide: 'ASYNC_CONNECTION',
            useFactory: async () => {
              const connection = await "connection";//createConnection(options);
              return connection;
            },
          }
    ],
    exports: ['CONNECTION'], // [connectionFactory]
})
export class CatsModule {}

/* 
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
} */