import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto, EditOfferDto } from './dto';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getOffers() {
    return await this.prisma.offer.findMany();
  }

  async getOffersByDomain(rootDomain: string) {
    return await this.prisma.offer.findMany({
      where: {
        rootDomain
      }
    });
  }

  async getOfferById(offerId: number) {
    return await this.prisma.offer.findUnique({
      where: {
        id: offerId
      }
    });
  }

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

  checkStatus = (validFrom: Date, validTo: Date) => {
    const date = new Date();

    let status;
    if (validTo) {
      const to = new Date(validTo);
      status = date > to ? 'Expired' : 'Active';
    } else if (validFrom) {
      const from = new Date(validFrom);
      status = date < from ? 'Scheduled' : 'Active';
    } else {
      status = 'Active';
    }

    return status;
  };

  async editOfferById(offerId: number, dto: EditOfferDto) {
    const offer = await this.prisma.product.findUnique({
      where: {
        id: offerId
      }
    });

    return this.prisma.offer.update({
      where: { id: offerId },
      data: { ...dto }
    });
  }

  async deleteOfferById(offerId: number) {
    return this.prisma.offer.delete({
      where: { id: offerId }
    });
  }
}
