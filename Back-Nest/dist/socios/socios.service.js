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
exports.SociosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const socio_entity_1 = require("./entities/socio.entity");
const typeorm_2 = require("typeorm");
const pagos_service_1 = require("../../src/pagos/pagos.service");
let SociosService = class SociosService {
    constructor(socioRepository, pagoService) {
        this.socioRepository = socioRepository;
        this.pagoService = pagoService;
    }
    async create(createSocioDto) {
        const userFound = await this.socioRepository.findOne({
            where: {
                nombre: createSocioDto.nombre
            }
        });
        if (userFound) {
            return new common_1.HttpException('El Socio ya existe. Prueba nuevamente.', common_1.HttpStatus.CONFLICT);
        }
        const newSocio = this.socioRepository.create(createSocioDto);
        const socioCreado = await this.socioRepository.save(newSocio);
        await this.pagoService.crearPagoInicial({ socioId: socioCreado.socioId, monto: 1000 });
        return socioCreado;
    }
    findAll() {
        return this.socioRepository.find();
    }
    findOne(id) {
        return this.socioRepository.findOneBy({ socioId: id });
    }
    async update(id, updateSocioDto) {
        const socio = await this.socioRepository.findOneBy({ socioId: id });
        if (!socio) {
            throw new common_1.HttpException('Socio no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        Object.assign(socio, updateSocioDto);
        return this.socioRepository.save(socio);
    }
    async remove(id) {
        const socio = await this.socioRepository.findOneBy({ socioId: id });
        if (!socio) {
            throw new Error('Socio no encontrado');
        }
        socio.eliminado = true;
        await this.socioRepository.save(socio);
    }
};
exports.SociosService = SociosService;
exports.SociosService = SociosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository, pagos_service_1.PagoService])
], SociosService);
//# sourceMappingURL=socios.service.js.map