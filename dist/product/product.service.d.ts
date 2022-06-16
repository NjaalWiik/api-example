import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    addProduct(dto: ProductDto): Promise<import(".prisma/client").Product>;
    findProduct(dto: ProductDto): Promise<import(".prisma/client").Product>;
}
