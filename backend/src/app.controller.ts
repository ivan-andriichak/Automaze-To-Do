import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHealthStatus(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Automaze To-Do API is running!',
    };
  }
}
