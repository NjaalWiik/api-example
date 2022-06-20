import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto, EditOfferDto } from './dto';
export declare class OfferService {
    private prisma;
    constructor(prisma: PrismaService);
    getOffers(): Promise<import(".prisma/client").Offer[]>;
    getOffersByDomain(rootDomain: string): Promise<import(".prisma/client").Offer[]>;
    getOfferById(offerId: number): Promise<import(".prisma/client").Offer>;
    createOffer(dto: CreateOfferDto): Promise<import(".prisma/client").Offer>;
    checkStatus: (validFrom: Date, validTo: Date) => any;
    editOfferById(offerId: number, dto: EditOfferDto): Promise<import(".prisma/client").Offer>;
    deleteOfferById(offerId: number): Promise<import(".prisma/client").Offer>;
}
