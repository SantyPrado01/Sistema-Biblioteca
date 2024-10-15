import { HttpException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';
export declare class LibrosService {
    private readonly libroRepository;
    constructor(libroRepository: Repository<Libro>);
    create(createLibroDto: CreateLibroDto): Promise<Libro | HttpException>;
    findAll(): Promise<Libro[]>;
    findOne(id: number): Promise<Libro>;
    update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro>;
    remove(id: number): Promise<void>;
}
