import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { LoggerModule } from '@shared/logger/logger.module';

@Module({
  imports: [HttpModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
