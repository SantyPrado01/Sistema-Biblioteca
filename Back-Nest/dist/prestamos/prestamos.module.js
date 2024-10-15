"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestamosModule = void 0;
const common_1 = require("@nestjs/common");
const prestamos_service_1 = require("./prestamos.service");
const prestamos_controller_1 = require("./prestamos.controller");
const prestamo_entity_1 = require("./entities/prestamo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const libros_module_1 = require("../libros/libros.module");
const socios_module_1 = require("../socios/socios.module");
const libro_entity_1 = require("../libros/entities/libro.entity");
const socios_service_1 = require("../socios/socios.service");
let PrestamosModule = class PrestamosModule {
};
exports.PrestamosModule = PrestamosModule;
exports.PrestamosModule = PrestamosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prestamo_entity_1.Prestamo, libro_entity_1.Libro]), libros_module_1.LibrosModule, socios_module_1.SociosModule],
        controllers: [prestamos_controller_1.PrestamosController],
        providers: [prestamos_service_1.PrestamosService, socios_service_1.SociosService],
    })
], PrestamosModule);
//# sourceMappingURL=prestamos.module.js.map