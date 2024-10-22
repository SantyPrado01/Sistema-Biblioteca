import { HttpException } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';
import { PagoService } from 'src/pagos/pagos.service';
export declare class SociosService {
    private readonly socioRepository;
    private readonly pagoService;
    constructor(socioRepository: Repository<Socio>, pagoService: PagoService);
    create(createSocioDto: CreateSocioDto): Promise<Socio | HttpException>;
    findAll(): Promise<Socio[]>;
    findOne(id: number): Promise<Socio>;
    update(id: number, updateSocioDto: UpdateSocioDto): Promise<Socio>;
    remove(id: number): Promise<void>;
}
