import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import type { IUserData } from '../auth/interfaces/user-data.interface';
import { UserResDto } from './dto/res/user.res.dto';
import { UserMapper } from './user.maper';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto | null> {
    const result = await this.usersService.findOneByEmail(userData.email);
    if (!result) return null;
    return UserMapper.toResponseDTO(result);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: string): Promise<UserResDto | null> {
    const result = await this.usersService.findOneByEmail(userId);
    if (!result) return null;
    return UserMapper.toResponseDTO(result);
  }
}
