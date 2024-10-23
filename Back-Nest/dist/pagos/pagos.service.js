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
exports.PagoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagos_entity_1 = require("./entities/pagos.entity");
const socio_entity_1 = require("../../src/socios/entities/socio.entity");
let PagoService = class PagoService {
    constructor(pagoRepository, socioRepository) {
        this.pagoRepository = pagoRepository;
        this.socioRepository = socioRepository;
    }
    async crearPagoInicial(createPagoDto) {
        const socio = await this.socioRepository.findOne({ where: { socioId: createPagoDto.socioId } });
        if (!socio) {
            throw new common_1.HttpException('Socio no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const fechaFacturacion = new Date();
        const fechaVencimiento = new Date();
        fechaVencimiento.setDate(fechaFacturacion.getDate() + 10);
        const pagoInicial = this.pagoRepository.create({
            socio: socio,
            monto: createPagoDto.monto || 1000,
            fechaFacturacion: fechaFacturacion,
            fechaVencimiento: fechaVencimiento,
            pagado: false,
        });
        await this.pagoRepository.save(pagoInicial);
        await this.generarPagosMensuales(socio);
        return pagoInicial;
    }
    async generarPagosMensuales(socio) {
        const pagosFuturos = [];
        const fechaInicio = new Date();
        const cantidadMeses = 11;
        for (let i = 1; i <= cantidadMeses; i++) {
            const nuevaFechaFacturacion = new Date(fechaInicio);
            nuevaFechaFacturacion.setMonth(nuevaFechaFacturacion.getMonth() + i);
            const nuevaFechaVencimiento = new Date(nuevaFechaFacturacion);
            nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 10);
            const nuevoPago = this.pagoRepository.create({
                socio: socio,
                monto: 1000,
                fechaFacturacion: nuevaFechaFacturacion,
                fechaVencimiento: nuevaFechaVencimiento,
                pagado: false,
            });
            pagosFuturos.push(nuevoPago);
        }
        await this.pagoRepository.save(pagosFuturos);
    }
    async findAll() {
        return this.pagoRepository.find({ relations: ['socio'] });
    }
    async findPagosBySocio(socioId) {
        return this.pagoRepository.find({ where: { socio: { socioId } }, relations: ['socio'] });
    }
    async findOne(id) {
        return this.pagoRepository.findOne({ where: { pagoId: id }, relations: ['socio'] });
    }
    async actualizarPago(pagoId, updatePagoDto) {
        const fechaPago = new Date();
        const pago = await this.pagoRepository.findOne({ where: { pagoId } });
        if (!pago) {
            throw new common_1.HttpException('Pago no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        Object.assign(pago, {
            ...updatePagoDto,
            fechaPago,
        });
        return this.pagoRepository.save(pago);
    }
};
exports.PagoService = PagoService;
exports.PagoService = PagoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pagos_entity_1.Pago)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PagoService);
//# sourceMappingURL=pagos.service.js.map