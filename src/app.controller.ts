import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiInternalServerErrorResponse({ description: 'Server error' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns "pong" if app is running',
  })
  getPing(): string {
    return this.appService.getPing();
  }
}
