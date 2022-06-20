import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto, EditShopDto } from './dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getShops() {
    return this.prisma.shop.findMany();
  }

  async getShopByUrl(shopRootDomain: string) {
    return await this.prisma.shop.findUnique({
      where: {
        rootDomain: shopRootDomain
      }
    });
  }

  async createShop(dto: CreateShopDto) {
    try {
      const shop = await this.prisma.shop.create({
        data: {
          name: dto.name,
          ...dto
        }
      });

      return shop;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Root domain exists');
        }

        throw error;
      }
    }
  }

  async editShopByUrl(shopRootDomain: string, dto: EditShopDto) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        rootDomain: shopRootDomain
      }
    });

    if (!shop) throw new ForbiddenException('Access to resource denied');
    return this.prisma.shop.update({
      where: { rootDomain: shopRootDomain },
      data: { ...dto }
    });
  }

  async deleteShop(shopRootDomain: string) {
    return this.prisma.shop.delete({
      where: { rootDomain: shopRootDomain }
    });
  }
}
