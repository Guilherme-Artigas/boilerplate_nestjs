import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from '@shared/logger/winston-logger';
import morganMiddleware from '@shared/middlewares/morgan.middleware';
import { HttpExceptionFilter } from '@shared/middlewares/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = WinstonLogger.getInstance();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(morganMiddleware);

  const config = new DocumentBuilder()
    .setTitle('Companies API')
    .setDescription('The companies API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0', () => {
    logger.info(`Server is running on port ${port}`);
  });
}
bootstrap();
