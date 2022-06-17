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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(productUrl) {
        return this.productService.getProducts();
    }
    getProductByUrl(productUrl) {
        return this.productService.getProductByUrl(productUrl);
    }
    createProduct(dto) {
        return this.productService.createProduct(dto);
    }
    editProductByUrl(dto, productUrl) {
        return this.productService.editProductByUrl(productUrl, dto);
    }
    deleteProductByUrl(productUrl) {
        return this.productService.deleteProduct(productUrl);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('productUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':productUrl'),
    __param(0, (0, common_1.Param)('productUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductByUrl", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(':productUrl'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('productUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDto, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "editProductByUrl", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':productUrl'),
    __param(0, (0, common_1.Param)('productUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProductByUrl", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map