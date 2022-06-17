import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(@Query('skip') skip: string, @Query('take') take: string) {
    return this.productService.getProducts(skip, take);
  }

  @Get(':productUrl')
  getProductByUrl(@Param('productUrl') productUrl: string) {
    return this.productService.getProductByUrl(productUrl);
  }

  @UseGuards(JwtGuard)
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':productUrl')
  editProductByUrl(
    @Body() dto: CreateProductDto,
    @Param('productUrl') productUrl: string
  ) {
    return this.productService.editProductByUrl(productUrl, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':productUrl')
  deleteProductByUrl(@Param('productUrl') productUrl: string) {
    return this.productService.deleteProduct(productUrl);
  }
}
