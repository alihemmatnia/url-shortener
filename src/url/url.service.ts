import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(originalUrl: string) {
    const { nanoid } = await import('nanoid');
    const shortCode = nanoid(8);

    const newUrl = await this.prisma.urlMapping.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    return newUrl;
  }

  async findOne(shortCode: string) {
    const urlMapping = await this.prisma.urlMapping.findUnique({
      where: { shortCode },
    });

    if (!urlMapping) {
      throw new NotFoundException('URL not found');
    }

    return urlMapping;
  }
}
