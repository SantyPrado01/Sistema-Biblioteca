import { PagoService } from './pagos.service';
import { Pago } from './entities/pagos.entity';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
export declare class PagoController {
    private readonly pagoService;
    constructor(pagoService: PagoService);
    createPago(createPagoDto: CreatePagoDto): Promise<Pago>;
    findAll(): Promise<Pago[]>;
    findPagosBySocio(socioId: number): Promise<Pago[]>;
    findOne(id: number): Promise<Pago>;
    actualizarPago(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago>;
}
