import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: 'Returns a greeting message',
        description: 'This endpoint returns a simple "Hello World" message as a response.',
    })
    @ApiOkResponse({
        description: 'A successful response containing the greeting message.',
        type: String,
    })
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('docs')
    @ApiExcludeEndpoint()
    @Redirect('/swagger', 302)
    redirectToSwagger() {
        return;
    }
}
