import { Repository } from 'typeorm';
import { Pago } from './entities/pagos.entity';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
import { Socio } from '../../src/socios/entities/socio.entity';
export declare class PagoService {
    private pagoRepository;
    private socioRepository;
    constructor(pagoRepository: Repository<Pago>, socioRepository: Repository<Socio>);
    crearPagoInicial(createPagoDto: CreatePagoDto): Promise<Pago>;
    generarPagosMensuales(socio: Socio): Promise<void>;
    findAll(): Promise<Pago[]>;
    findPagosBySocio(socioId: number): Promise<Pago[]>;
    findOne(id: number): Promise<Pago>;
    actualizarPago(pagoId: number, updatePagoDto: UpdatePagoDto): Promise<Pago>;
}
