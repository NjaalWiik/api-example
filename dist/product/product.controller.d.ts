import { CreateProductDto } from './dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(productUrl: string): Promise<void>;
    getProductByUrl(productUrl: string): Promise<void>;
    createProduct(dto: CreateProductDto): Promise<void>;
    editProductByUrl(dto: CreateProductDto, productUrl: string): Promise<void>;
    deleteProductByUrl(productUrl: string): Promise<void>;
}
