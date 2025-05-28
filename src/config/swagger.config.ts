import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('Documentação da API')
  .setVersion('1.0')
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
    syntaxHighlight: {
      theme: 'monokai',
    },
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    displayRequestDuration: true,
    tryItOutEnabled: true,
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 30px 0 }
    .swagger-ui .scheme-container { display: none }
    .swagger-ui .info .title { font-size: 2.5em }
    .swagger-ui .info .description { font-size: 1.2em }
    .swagger-ui .models { display: none }
    .swagger-ui .opblock-tag { font-size: 1.2em; padding: 10px 0 }
    .swagger-ui .opblock { margin: 0 0 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1) }
    .swagger-ui .opblock .opblock-summary { padding: 10px }
    .swagger-ui .opblock .opblock-summary-method { border-radius: 4px; font-size: 0.9em }
    .swagger-ui .btn { border-radius: 4px }
    .swagger-ui select { border-radius: 4px }
    .swagger-ui input { border-radius: 4px }
    .swagger-ui textarea { border-radius: 4px }
    .swagger-ui .parameter__name { font-size: 1em }
    .swagger-ui .parameter__type { font-size: 0.9em }
    body { margin: 0; padding: 0 }
    #swagger-ui { max-width: 1200px; margin: 0 auto; padding: 20px }
  `,
  customSiteTitle: 'API Documentation',
};
