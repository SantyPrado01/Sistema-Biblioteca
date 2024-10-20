import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
export declare class PrestamosController {
    private readonly prestamosService;
    constructor(prestamosService: PrestamosService);
    create(createPrestamoDto: CreatePrestamoDto): Promise<import("./entities/prestamo.entity").Prestamo>;
    findAll(): Promise<import("./entities/prestamo.entity").Prestamo[]>;
    findOne(id: string): Promise<import("./entities/prestamo.entity").Prestamo>;
    update(id: string, updatePrestamoDto: UpdatePrestamoDto): Promise<import("./entities/prestamo.entity").Prestamo>;
    remove(id: string): string;
}
