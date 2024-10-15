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
exports.PrestamosController = void 0;
const common_1 = require("@nestjs/common");
const prestamos_service_1 = require("./prestamos.service");
const create_prestamo_dto_1 = require("./dto/create-prestamo.dto");
const update_prestamo_dto_1 = require("./dto/update-prestamo.dto");
let PrestamosController = class PrestamosController {
    constructor(prestamosService) {
        this.prestamosService = prestamosService;
    }
    create(createPrestamoDto) {
        return this.prestamosService.create(createPrestamoDto);
    }
    findAll() {
        return this.prestamosService.findAll();
    }
    findOne(id) {
        return this.prestamosService.findOne(+id);
    }
    update(id, updatePrestamoDto) {
        return this.prestamosService.update(+id, updatePrestamoDto);
    }
    remove(id) {
        return this.prestamosService.remove(+id);
    }
};
exports.PrestamosController = PrestamosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prestamo_dto_1.CreatePrestamoDto]),
    __metadata("design:returntype", void 0)
], PrestamosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrestamosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestamosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prestamo_dto_1.UpdatePrestamoDto]),
    __metadata("design:returntype", void 0)
], PrestamosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrestamosController.prototype, "remove", null);
exports.PrestamosController = PrestamosController = __decorate([
    (0, common_1.Controller)('prestamos'),
    __metadata("design:paramtypes", [prestamos_service_1.PrestamosService])
], PrestamosController);
//# sourceMappingURL=prestamos.controller.js.map