import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, ['email', 'password', 'name']) {}
