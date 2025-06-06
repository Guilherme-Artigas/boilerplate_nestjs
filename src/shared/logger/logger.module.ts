import { Global, Module } from '@nestjs/common';
import { WinstonLogger } from './winston-logger';

@Global()
@Module({
  providers: [
    {
      provide: 'ILogger',
      useClass: WinstonLogger,
    },
  ],
  exports: ['ILogger'],
})
export class LoggerModule {}
