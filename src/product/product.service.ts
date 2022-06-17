import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    productUrl: string,
    params?: { skip?: number; take?: number }
  ) {
    const { skip, take } = params;

    if (isNaN(skip)) {
      return this.prisma.product.findMany({
        take
      });
    } else {
      return this.prisma.product.findMany({
        skip,
        take
      });
    }
  }

  async getProductByUrl(productUrl: string) {}
  async createProduct(dto: CreateProductDto) {}
  async editProductByUrl(productUrl: string, dto: EditProductDto) {}
  async deleteProduct(productUrl: string) {}

  // async addProduct(dto: CreateProductDto) {
  //   try {
  //     const product = await this.prisma.product.create({
  //       data: {
  //         url: dto.url,
  //         pricespyId: dto.pricespyId
  //       }
  //     });

  //     return product;
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException('Url exists');
  //       }
  //       throw error;
  //     }
  //   }
  // }
}
