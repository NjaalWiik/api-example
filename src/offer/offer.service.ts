import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getOffers() {
    return await this.prisma.offer.findMany();
  }

  getOffersByDomain() {}

  async createOffer(dto: CreateOfferDto) {
    try {
      const offer = await this.prisma.offer.create({
        data: {
          rootDomain: dto.rootDomain,
          type: dto.type,
          amount: dto.amount,
          amountType: dto.amountType,
          ...dto
        }
      });

      return offer;
    } catch (error) {
      throw error;
    }
  }

  editOfferById() {}

  deleteOfferById() {}
}
