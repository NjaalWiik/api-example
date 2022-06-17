import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProductByUrl(productUrl: string) {
    return await this.prisma.product.findUnique({
      where: {
        url: productUrl
      }
    });
  }

  async createProduct(dto: CreateProductDto) {
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

  async editProductByUrl(productUrl: string, dto: EditProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        url: productUrl
      }
    });

    if (!product) throw new ForbiddenException('Access to resource denied');

    return this.prisma.product.update({
      where: { url: productUrl },
      data: { ...dto }
    });
  }

  async deleteProduct(productUrl: string) {}
}
