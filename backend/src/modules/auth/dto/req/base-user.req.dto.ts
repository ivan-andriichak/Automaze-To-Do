import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

import { regexConstant } from '../../../../common/constants/regex.constant';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseUserReqDto {
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Clavdia',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({
    description: 'The surname of the user.',
    example: 'Petrivna',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  surname?: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email address of the user.',
    maxLength: 300,
  })
  @IsString()
  @IsEmail()
  @Length(0, 300)
  @Matches(regexConstant.EMAIL)
  email: string;

  @ApiProperty({
    example: '123qwe!@#QWE',
    description: 'The password of the user.',
  })
  password: string;
}
