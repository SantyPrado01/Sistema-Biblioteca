import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibrosService {
  constructor(@InjectRepository(Libro) private readonly libroRepository: Repository<Libro>) {}

  async create(createLibroDto: CreateLibroDto) {
    const userFound = await this.libroRepository.findOne({
      where:{
          titulo: createLibroDto.titulo
      }
    })
    if (userFound){
      return new HttpException('El libro ya existe. Prueba nuevamente.', HttpStatus.CONFLICT)
    }
    const nuevoLibro = this.libroRepository.create(createLibroDto);
    return this.libroRepository.save(nuevoLibro);
  }

  findAll() {
    return this.libroRepository.find();
  }

  findOne(id: number) {
    return this.libroRepository.findOneBy({ libroId: id });
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    const libro = await this.libroRepository.findOneBy({ libroId: id });
    if (!libro) {
      throw new Error('Libro no encontrado');
    }
    Object.assign(libro, updateLibroDto);
    return this.libroRepository.save(libro);
  }

  async remove(id: number) {
    const libro = await this.libroRepository.findOneBy({ libroId: id });
    if (!libro) {
      throw new Error('Libro no encontrado');
    }
    libro.eliminado = true;  // Borrado lógico
    await this.libroRepository.save(libro);
  }
}
