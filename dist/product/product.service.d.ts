import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    getProducts(): Promise<void>;
    getProductByUrl(productUrl: string): Promise<void>;
    createProduct(dto: CreateProductDto): Promise<void>;
    editProductByUrl(productUrl: string, dto: EditProductDto): Promise<void>;
    deleteProduct(productUrl: string): Promise<void>;
}
