import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { Socio } from 'src/socios/entities/socio.entity';
export declare class PrestamosService {
    private readonly prestamoRepository;
    private readonly socioRepository;
    constructor(prestamoRepository: Repository<Prestamo>, socioRepository: Repository<Socio>);
    create(createPrestamoDto: CreatePrestamoDto): Promise<Prestamo>;
    findAll(): Promise<Prestamo[]>;
    findOne(id: number): Promise<Prestamo>;
    update(id: number, updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo>;
    remove(id: number): string;
}
