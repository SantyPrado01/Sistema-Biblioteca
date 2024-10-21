"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagos_entity_1 = require("./entities/pagos.entity");
const pagos_service_1 = require("./pagos.service");
const pagos_controller_1 = require("./pagos.controller");
const socio_entity_1 = require("../socios/entities/socio.entity");
let PagoModule = class PagoModule {
};
exports.PagoModule = PagoModule;
exports.PagoModule = PagoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pagos_entity_1.Pago, socio_entity_1.Socio])],
        providers: [pagos_service_1.PagoService],
        controllers: [pagos_controller_1.PagoController],
        exports: [pagos_service_1.PagoService],
    })
], PagoModule);
//# sourceMappingURL=pagos.module.js.map