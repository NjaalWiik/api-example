import { Body, Controller, Post } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }
}
