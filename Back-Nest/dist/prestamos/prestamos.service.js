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
exports.PrestamosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prestamo_entity_1 = require("./entities/prestamo.entity");
const typeorm_2 = require("typeorm");
const socio_entity_1 = require("../socios/entities/socio.entity");
const socios_service_1 = require("../socios/socios.service");
let PrestamosService = class PrestamosService {
    constructor(prestamoRepository, socioRepository, sociosService) {
        this.prestamoRepository = prestamoRepository;
        this.socioRepository = socioRepository;
        this.sociosService = sociosService;
    }
    async create(createPrestamoDto) {
        const libroEnPrestamo = await this.prestamoRepository.findOne({
            where: { libro: { libroId: createPrestamoDto.libroId }, fechaDevolucion: null },
        });
        if (libroEnPrestamo) {
            throw new common_1.HttpException('El libro ya está en préstamo', common_1.HttpStatus.BAD_REQUEST);
        }
        const socio = await this.socioRepository.findOne({
            where: { socioId: createPrestamoDto.socioId },
            relations: ['prestamos'],
        });
        const prestamosActivos = socio.prestamos.filter((prestamo) => prestamo.fechaDevolucion === null);
        if (prestamosActivos.length >= 5) {
            throw new common_1.HttpException('El socio ya tiene demasiados préstamos activos', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAll() {
        return this.prestamoRepository.find({
            relations: ['libro', 'socio'],
        });
    }
    findOne(id) {
        return this.prestamoRepository.findOne({
            where: { prestamoId: id },
            relations: ['libro', 'socio'],
        });
    }
    async update(id, updatePrestamoDto) {
        const prestamo = await this.prestamoRepository.findOneBy({ prestamoId: id });
        if (!prestamo) {
            throw new Error('Préstamo no encontrado');
        }
        Object.assign(prestamo, updatePrestamoDto);
        return this.prestamoRepository.save(prestamo);
    }
    remove(id) {
        return `This action removes a #${id} prestamo`;
    }
};
exports.PrestamosService = PrestamosService;
exports.PrestamosService = PrestamosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prestamo_entity_1.Prestamo)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        socios_service_1.SociosService])
], PrestamosService);
//# sourceMappingURL=prestamos.service.js.map