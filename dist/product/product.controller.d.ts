import { CreateProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): Promise<import(".prisma/client").Product[]>;
    getProductByUrl(productUrl: string): Promise<import(".prisma/client").Product>;
    createProduct(dto: CreateProductDto): Promise<import(".prisma/client").Product>;
    editProductByUrl(dto: EditProductDto, productUrl: string): Promise<import(".prisma/client").Product>;
    deleteProductByUrl(productUrl: string): Promise<import(".prisma/client").Product>;
}
