import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../app/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get('hash')
  createHash(): any {
    return this.authService.hashPassword('abcd1234');
  }
}
