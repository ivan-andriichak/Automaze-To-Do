import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginReqDto } from './dto/req/login.req.dto';
import { RegisterReqDto } from './dto/req/register.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully', type: AuthResDto })
  async register(@Body() dto: RegisterReqDto): Promise<{ access_token: string }> {
    return await this.authService.register(dto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() dto: LoginReqDto): Promise<{ access_token: string }> {
    return await this.authService.login(dto);
  }
}
