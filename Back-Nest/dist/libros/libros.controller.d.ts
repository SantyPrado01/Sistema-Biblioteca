import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
export declare class LibrosController {
    private readonly librosService;
    constructor(librosService: LibrosService);
    create(createLibroDto: CreateLibroDto): Promise<import("./entities/libro.entity").Libro | import("@nestjs/common").HttpException>;
    findAll(): Promise<import("./entities/libro.entity").Libro[]>;
    findOne(id: string): Promise<import("./entities/libro.entity").Libro>;
    update(id: string, updateLibroDto: UpdateLibroDto): Promise<import("./entities/libro.entity").Libro>;
    remove(id: string): Promise<void>;
}
