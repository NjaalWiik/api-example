import { CreateShopDto, EditShopDto } from './dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private shopService;
    constructor(shopService: ShopService);
    getShops(): Promise<import(".prisma/client").Shop[]>;
    getShopByUrl(shopUrl: string): Promise<import(".prisma/client").Shop>;
    createShop(dto: CreateShopDto): Promise<import(".prisma/client").Shop>;
    editShopByUrl(dto: EditShopDto, shopUrl: string): Promise<import(".prisma/client").Shop>;
    deleteShopByUrl(shopUrl: string): Promise<import(".prisma/client").Shop>;
}
