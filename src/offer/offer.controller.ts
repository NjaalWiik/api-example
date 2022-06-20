import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateOfferDto, EditOfferDto } from './dto';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get()
  getOffers() {
    return this.offerService.getOffers();
  }

  @Get(':rootDomain')
  getOffersByDomain(@Param('rootDomain') rootDomain: string) {
    return this.offerService.getOffersByDomain(rootDomain);
  }

  @Get('offer/:offerId')
  getOffersById(@Param('offerId', ParseIntPipe) offerId: number) {
    return this.offerService.getOfferById(offerId);
  }

  @Post()
  createOffer(@Body() dto: CreateOfferDto) {
    const status = this.offerService.checkStatus(dto.validFrom, dto.validTo);
    return this.offerService.createOffer({
      status,
      ...dto
    });
  }

  @UseGuards(JwtGuard)
  @Patch(':offerId')
  editProductByUrl(
    @Body() dto: EditOfferDto,
    @Param('offerId', ParseIntPipe) offerId: number
  ) {
    return this.offerService.editOfferById(offerId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':offerId')
  deleteOfferById(@Param('offerId', ParseIntPipe) offerId: number) {
    return this.offerService.deleteOfferById(offerId);
  }
}
