import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get()
  getOffers() {}

  @Get(':domain')
  getOffersByDomain() {}

  @Post()
  createOffer(@Body() dto: CreateOfferDto) {
    return this.offerService.createOffer(dto);
  }

  @Patch()
  editOfferById() {}

  @Delete()
  deleteOfferById() {}
}
