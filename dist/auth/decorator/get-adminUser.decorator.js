"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdminUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetAdminUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
        return request.adminUser[data];
    }
    return request.adminUser;
});
//# sourceMappingURL=get-adminUser.decorator.js.map