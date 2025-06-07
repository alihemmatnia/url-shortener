import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('urls')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({
    status: 201,
    description: 'The shortened URL was successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The provided URL is invalid.',
  })
  @HttpCode(HttpStatus.CREATED)
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    const newUrl = await this.urlService.create(createUrlDto.originalUrl);

    return {
      ...newUrl,
      shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
    };
  }

  @Get(':shortCode')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiParam({
    name: 'shortCode',
    description: 'The unique code of the shortened URL.',
    example: 'aBcDeF1g',
  })
  @ApiResponse({
    status: 301,
    description: 'Successfully redirected to the original URL.',
  })
  @ApiResponse({ status: 404, description: 'Short code not found.' })
  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const urlMapping = await this.urlService.findOne(shortCode);

    res.redirect(HttpStatus.MOVED_PERMANENTLY, urlMapping.originalUrl);
  }
}
