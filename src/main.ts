import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors()
  app.setGlobalPrefix('v1') // rotas ficarão como /v1/companies, /v1/products etc.

  const config = new DocumentBuilder()
    .setTitle('A Gestora API')
    .setDescription('API for managing companies and products')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document) // acessível em /api

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
