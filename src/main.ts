import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = new Logger('main');

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    setupSwagger(app);

    await app.listen(process.env.PORT || 3000);

    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
