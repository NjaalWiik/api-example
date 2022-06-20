import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto, EditShopDto } from './dto';
export declare class ShopService {
    private prisma;
    constructor(prisma: PrismaService);
    getShops(): Promise<import(".prisma/client").Shop[]>;
    getShopByUrl(shopRootDomain: string): Promise<import(".prisma/client").Shop>;
    createShop(dto: CreateShopDto): Promise<import(".prisma/client").Shop>;
    editShopByUrl(shopRootDomain: string, dto: EditShopDto): Promise<import(".prisma/client").Shop>;
    deleteShop(shopRootDomain: string): Promise<import(".prisma/client").Shop>;
}
