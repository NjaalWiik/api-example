import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OfferService {
    private prisma;
    constructor(prisma: PrismaService);
    getOffers(): Promise<import(".prisma/client").Offer[]>;
    getOffersByDomain(): void;
    createOffer(dto: CreateOfferDto): Promise<import(".prisma/client").Offer>;
    editOfferById(): void;
    deleteOfferById(): void;
}
