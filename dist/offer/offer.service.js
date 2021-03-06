"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OfferService = class OfferService {
    constructor(prisma) {
        this.prisma = prisma;
        this.checkStatus = (validFrom, validTo) => {
            const date = new Date();
            let status;
            if (validTo) {
                const to = new Date(validTo);
                status = date > to ? 'Expired' : 'Active';
            }
            else if (validFrom) {
                const from = new Date(validFrom);
                status = date < from ? 'Scheduled' : 'Active';
            }
            else {
                status = 'Active';
            }
            return status;
        };
    }
    async getOffers() {
        return await this.prisma.offer.findMany();
    }
    async getOffersByDomain(rootDomain) {
        return await this.prisma.offer.findMany({
            where: {
                rootDomain
            }
        });
    }
    async getOfferById(offerId) {
        return await this.prisma.offer.findUnique({
            where: {
                id: offerId
            }
        });
    }
    async createOffer(dto) {
        try {
            const offer = await this.prisma.offer.create({
                data: Object.assign({ rootDomain: dto.rootDomain, type: dto.type, amount: dto.amount, amountType: dto.amountType }, dto)
            });
            return offer;
        }
        catch (error) {
            throw error;
        }
    }
    async editOfferById(offerId, dto) {
        const offer = await this.prisma.product.findUnique({
            where: {
                id: offerId
            }
        });
        return this.prisma.offer.update({
            where: { id: offerId },
            data: Object.assign({}, dto)
        });
    }
    async deleteOfferById(offerId) {
        return this.prisma.offer.delete({
            where: { id: offerId }
        });
    }
};
OfferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OfferService);
exports.OfferService = OfferService;
//# sourceMappingURL=offer.service.js.map