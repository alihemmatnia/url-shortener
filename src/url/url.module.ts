import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaClient } from 'generated/prisma';

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaClient],
})
export class UrlModule {}
