import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  serverStatus(): object {
    return {
      status: 'running',
      version: '1.0.0',
      documentation: 'http://localhost:3000/docs',
    };
  }
}
