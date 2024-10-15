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
exports.SociosController = void 0;
const common_1 = require("@nestjs/common");
const socios_service_1 = require("./socios.service");
const create_socio_dto_1 = require("./dto/create-socio.dto");
const update_socio_dto_1 = require("./dto/update-socio.dto");
let SociosController = class SociosController {
    constructor(sociosService) {
        this.sociosService = sociosService;
    }
    create(createSocioDto) {
        return this.sociosService.create(createSocioDto);
    }
    findAll() {
        return this.sociosService.findAll();
    }
    findOne(id) {
        return this.sociosService.findOne(+id);
    }
    update(id, updateSocioDto) {
        return this.sociosService.update(+id, updateSocioDto);
    }
    remove(id) {
        return this.sociosService.remove(+id);
    }
};
exports.SociosController = SociosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socio_dto_1.CreateSocioDto]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_socio_dto_1.UpdateSocioDto]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "remove", null);
exports.SociosController = SociosController = __decorate([
    (0, common_1.Controller)('socios'),
    __metadata("design:paramtypes", [socios_service_1.SociosService])
], SociosController);
//# sourceMappingURL=socios.controller.js.map