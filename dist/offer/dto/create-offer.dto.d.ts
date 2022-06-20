export declare class CreateOfferDto {
    rootDomain: string;
    type: string;
    coupon?: string;
    name?: string;
    page?: string;
    terms?: string;
    trackinUrl?: string;
    validTo?: Date;
    validFrom?: Date;
    amount: number;
    amountType: string;
    verifiedCoupon?: boolean;
    status?: string;
    feedbackPositive?: number;
    feedbackNegative?: number;
    clicked?: number;
    source?: string;
    lastVerified?: Date;
}
