import { CreateOfferDto, EditOfferDto } from './dto';
import { OfferService } from './offer.service';
export declare class OfferController {
    private offerService;
    constructor(offerService: OfferService);
    getOffers(): Promise<import(".prisma/client").Offer[]>;
    getOffersByDomain(rootDomain: string): Promise<import(".prisma/client").Offer[]>;
    getOffersById(offerId: number): Promise<import(".prisma/client").Offer>;
    createOffer(dto: CreateOfferDto): Promise<import(".prisma/client").Offer>;
    editProductByUrl(dto: EditOfferDto, offerId: number): Promise<import(".prisma/client").Offer>;
    deleteOfferById(offerId: number): Promise<import(".prisma/client").Offer>;
}
