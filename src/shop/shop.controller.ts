import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateShopDto, EditShopDto } from './dto';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  getShops() {
    return this.shopService.getShops();
  }

  @Get(':shopUrl')
  getShopByUrl(@Param('shopUrl') shopUrl: string) {
    return this.shopService.getShopByUrl(shopUrl);
  }

  @UseGuards(JwtGuard)
  @Post()
  createShop(@Body() dto: CreateShopDto) {
    return this.shopService.createShop(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':shopUrl')
  editShopByUrl(@Body() dto: EditShopDto, @Param('shopUrl') shopUrl: string) {
    return this.shopService.editShopByUrl(shopUrl, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':shopUrl')
  deleteShopByUrl(@Param('shopUrl') shopUrl: string) {
    return this.shopService.deleteShop(shopUrl);
  }
}
