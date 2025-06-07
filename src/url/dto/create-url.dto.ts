import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The original, long URL that you want to shorten.',
    example: 'https://www.google.com/search?q=test',
  })
  @IsUrl({}, { message: 'A valid URL must be provided.' })
  @IsNotEmpty()
  originalUrl: string;
}
