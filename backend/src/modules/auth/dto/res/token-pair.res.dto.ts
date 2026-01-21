import { ApiProperty } from '@nestjs/swagger';

export class TokenPairResDto {
  @ApiProperty({
    description: 'Access token for authenticated requests',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
