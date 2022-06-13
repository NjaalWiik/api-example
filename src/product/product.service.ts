import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { doesNotReject } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: ProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          url: dto.url,
          pricespyId: dto.pricespyId
        }
      });

      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Url exists');
        }
        throw error;
      }
    }
  }

  async findProduct(dto: ProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        url: dto.url
      }
    });

    // if product does not exist throw exception
    if (!product) throw new ForbiddenException('No url found');

    return product;
  }
}
