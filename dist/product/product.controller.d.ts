import { ProductDto } from './dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(dto: ProductDto): Promise<import(".prisma/client").Product>;
}
