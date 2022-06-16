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
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const service_adminUser_1 = require("./service.adminUser");
let AdminUserController = class AdminUserController {
    constructor(adminUserService) {
        this.adminUserService = adminUserService;
    }
    getMe(adminUser) {
        return adminUser;
    }
    editAdminUser(adminUserId, dto) {
        return this.adminUserService.editAdminUser(adminUserId, dto);
    }
};
__decorate([
    (0, common_1.Get)('me'),
    __param(0, GetAdminUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, GetAdminUser('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.EditAdminUserDto]),
    __metadata("design:returntype", void 0)
], AdminUserController.prototype, "editAdminUser", null);
AdminUserController = __decorate([
    (0, common_1.UseGuards)(JwtGuard),
    (0, common_1.Controller)('adminUsers'),
    __metadata("design:paramtypes", [service_adminUser_1.AdminUserService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=controller.adminUser.js.map