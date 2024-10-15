import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { Socio } from 'src/socios/entities/socio.entity';
import { SociosService } from 'src/socios/socios.service';
export declare class PrestamosService {
    private readonly prestamoRepository;
    private readonly socioRepository;
    private readonly sociosService;
    constructor(prestamoRepository: Repository<Prestamo>, socioRepository: Repository<Socio>, sociosService: SociosService);
    create(createPrestamoDto: CreatePrestamoDto): Promise<void>;
    findAll(): Promise<Prestamo[]>;
    findOne(id: number): Promise<Prestamo>;
    update(id: number, updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo>;
    remove(id: number): string;
}
