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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let ShopService = class ShopService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getShops() {
        return this.prisma.shop.findMany();
    }
    async getShopByUrl(shopRootDomain) {
        return await this.prisma.shop.findUnique({
            where: {
                rootDomain: shopRootDomain
            }
        });
    }
    async createShop(dto) {
        try {
            const shop = await this.prisma.shop.create({
                data: Object.assign({ name: dto.name }, dto)
            });
            return shop;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Root domain exists');
                }
                throw error;
            }
        }
    }
    async editShopByUrl(shopRootDomain, dto) {
        const shop = await this.prisma.shop.findUnique({
            where: {
                rootDomain: shopRootDomain
            }
        });
        if (!shop)
            throw new common_1.ForbiddenException('Access to resource denied');
        return this.prisma.shop.update({
            where: { rootDomain: shopRootDomain },
            data: Object.assign({}, dto)
        });
    }
    async deleteShop(shopRootDomain) {
        return this.prisma.shop.delete({
            where: { rootDomain: shopRootDomain }
        });
    }
};
ShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map