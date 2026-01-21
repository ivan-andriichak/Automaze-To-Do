import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    example: 'Example1!',
    description: 'The email address of the user.',
    maxLength: 300,
  })
  @IsString()
  @Length(0, 300)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
