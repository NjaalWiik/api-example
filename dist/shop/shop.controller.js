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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const shop_service_1 = require("./shop.service");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    getShops() {
        return this.shopService.getShops();
    }
    getShopByUrl(shopUrl) {
        return this.shopService.getShopByUrl(shopUrl);
    }
    createShop(dto) {
        return this.shopService.createShop(dto);
    }
    editShopByUrl(dto, shopUrl) {
        return this.shopService.editShopByUrl(shopUrl, dto);
    }
    deleteShopByUrl(shopUrl) {
        return this.shopService.deleteShop(shopUrl);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getShops", null);
__decorate([
    (0, common_1.Get)(':shopUrl'),
    __param(0, (0, common_1.Param)('shopUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getShopByUrl", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "createShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(':shopUrl'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('shopUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditShopDto, String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "editShopByUrl", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':shopUrl'),
    __param(0, (0, common_1.Param)('shopUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "deleteShopByUrl", null);
ShopController = __decorate([
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map