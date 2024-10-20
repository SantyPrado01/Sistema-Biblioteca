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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prestamo = void 0;
const typeorm_1 = require("typeorm");
const libro_entity_1 = require("../../libros/entities/libro.entity");
const socio_entity_1 = require("../../socios/entities/socio.entity");
let Prestamo = class Prestamo {
};
exports.Prestamo = Prestamo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Prestamo.prototype, "prestamoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => libro_entity_1.Libro, libro => libro.prestamos),
    __metadata("design:type", libro_entity_1.Libro)
], Prestamo.prototype, "libro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => socio_entity_1.Socio, socio => socio.prestamos),
    __metadata("design:type", socio_entity_1.Socio)
], Prestamo.prototype, "socio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Prestamo.prototype, "fechaPrestamo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Prestamo.prototype, "fechaDevolucion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Prestamo.prototype, "devuelto", void 0);
exports.Prestamo = Prestamo = __decorate([
    (0, typeorm_1.Entity)()
], Prestamo);
//# sourceMappingURL=prestamo.entity.js.map