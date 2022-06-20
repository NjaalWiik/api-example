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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const offer_service_1 = require("./offer.service");
let OfferController = class OfferController {
    constructor(offerService) {
        this.offerService = offerService;
    }
    getOffers() {
        return this.offerService.getOffers();
    }
    getOffersByDomain(rootDomain) {
        return this.offerService.getOffersByDomain(rootDomain);
    }
    getOffersById(offerId) {
        return this.offerService.getOfferById(offerId);
    }
    createOffer(dto) {
        const status = this.offerService.checkStatus(dto.validFrom, dto.validTo);
        return this.offerService.createOffer(Object.assign({ status }, dto));
    }
    editProductByUrl(dto, offerId) {
        return this.offerService.editOfferById(offerId, dto);
    }
    deleteOfferById(offerId) {
        return this.offerService.deleteOfferById(offerId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "getOffers", null);
__decorate([
    (0, common_1.Get)(':rootDomain'),
    __param(0, (0, common_1.Param)('rootDomain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "getOffersByDomain", null);
__decorate([
    (0, common_1.Get)('offer/:offerId'),
    __param(0, (0, common_1.Param)('offerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "getOffersById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOfferDto]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "createOffer", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(':offerId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('offerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditOfferDto, Number]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "editProductByUrl", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':offerId'),
    __param(0, (0, common_1.Param)('offerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "deleteOfferById", null);
OfferController = __decorate([
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferController);
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map