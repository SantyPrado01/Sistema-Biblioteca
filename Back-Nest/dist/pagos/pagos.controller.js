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
exports.PagoController = void 0;
const common_1 = require("@nestjs/common");
const pagos_service_1 = require("./pagos.service");
const create_pagos_dto_1 = require("./dto/create-pagos.dto");
const update_pagos_dto_1 = require("./dto/update-pagos.dto");
let PagoController = class PagoController {
    constructor(pagoService) {
        this.pagoService = pagoService;
    }
    async createPago(createPagoDto) {
        try {
            const nuevoPago = await this.pagoService.crearPagoInicial(createPagoDto);
            return nuevoPago;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return this.pagoService.findAll();
    }
    async findPagosBySocio(socioId) {
        return this.pagoService.findPagosBySocio(socioId);
    }
    async findOne(id) {
        const pago = await this.pagoService.findOne(id);
        if (!pago) {
            throw new common_1.HttpException('Pago no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return pago;
    }
    async actualizarPago(id, updatePagoDto) {
        try {
            const pagoActualizado = await this.pagoService.actualizarPago(id, updatePagoDto);
            return pagoActualizado;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PagoController = PagoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pagos_dto_1.CreatePagoDto]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "createPago", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/socio/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "findPagosBySocio", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pagos_dto_1.UpdatePagoDto]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "actualizarPago", null);
exports.PagoController = PagoController = __decorate([
    (0, common_1.Controller)('pagos'),
    __metadata("design:paramtypes", [pagos_service_1.PagoService])
], PagoController);
//# sourceMappingURL=pagos.controller.js.map