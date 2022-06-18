import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    getProducts(): Promise<import(".prisma/client").Product[]>;
    getProductByUrl(productUrl: string): Promise<import(".prisma/client").Product>;
    createProduct(dto: CreateProductDto): Promise<import(".prisma/client").Product>;
    editProductByUrl(productUrl: string, dto: EditProductDto): Promise<import(".prisma/client").Product>;
    deleteProduct(productUrl: string): Promise<import(".prisma/client").Product>;
}
