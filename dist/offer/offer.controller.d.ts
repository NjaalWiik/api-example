import { CreateOfferDto } from './dto';
import { OfferService } from './offer.service';
export declare class OfferController {
    private offerService;
    constructor(offerService: OfferService);
    getOffers(): void;
    getOffersByDomain(): void;
    createOffer(dto: CreateOfferDto): Promise<import(".prisma/client").Offer>;
    editOfferById(): void;
    deleteOfferById(): void;
}
