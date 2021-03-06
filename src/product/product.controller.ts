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
import { CreateProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
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
    @Body() dto: EditProductDto,
    @Param('productUrl') productUrl: string
  ) {
    return this.productService.editProductByUrl(productUrl, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':productUrl')
  deleteProductByUrl(@Param('productUrl') productUrl: string) {
    return this.productService.deleteProduct(productUrl);
  }
}
