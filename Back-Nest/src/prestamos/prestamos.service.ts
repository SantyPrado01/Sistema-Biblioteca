import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { Socio } from 'src/socios/entities/socio.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { SociosService } from 'src/socios/socios.service';

@Injectable()
export class PrestamosService {
  constructor( 
    @InjectRepository(Prestamo) private readonly prestamoRepository: Repository<Prestamo>,
    @InjectRepository(Socio) private readonly socioRepository: Repository<Socio>,  // Inyectar LibroRepository
    private readonly sociosService: SociosService,
) {}

  async create(createPrestamoDto: CreatePrestamoDto){
    const libroEnPrestamo = await this.prestamoRepository.findOne({
      where: { libro: { libroId: createPrestamoDto.libroId }, fechaDevolucion: null },
    });

    if (libroEnPrestamo) {
      throw new HttpException('El libro ya está en préstamo', HttpStatus.BAD_REQUEST);
    }
    const socio = await this.socioRepository.findOne({
      where: { socioId: createPrestamoDto.socioId },
      relations: ['prestamos'],
    });

    const prestamosActivos = socio.prestamos.filter(
      (prestamo) => prestamo.fechaDevolucion === null,
    );

    if (prestamosActivos.length >= 5) {
      throw new HttpException('El socio ya tiene demasiados préstamos activos', HttpStatus.BAD_REQUEST);
    }
  }

  findAll(): Promise<Prestamo[]> {
    return this.prestamoRepository.find({
      relations: ['libro', 'socio'],
    });
  }

  findOne(id: number) {
    return this.prestamoRepository.findOne({
      where: { prestamoId: id },
      relations: ['libro', 'socio'],
    });
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOneBy({ prestamoId: id });
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }
    Object.assign(prestamo, updatePrestamoDto);
    return this.prestamoRepository.save(prestamo);
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
