import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { Socio } from 'src/socios/entities/socio.entity';

@Injectable()
export class PrestamosService {
  constructor( 
    @InjectRepository(Prestamo) private readonly prestamoRepository: Repository<Prestamo>,
    @InjectRepository(Socio) private readonly socioRepository: Repository<Socio>, 
) {}

async create(createPrestamoDto: CreatePrestamoDto) {
  // Verificar si el libro está en un préstamo activo
  const libroEnPrestamo = await this.prestamoRepository.findOne({
    where: {
      libro: { libroId: createPrestamoDto.libro.libroId },
      devuelto: false, // Cambiado para verificar si el préstamo no ha sido devuelto
    },
  });

  if (libroEnPrestamo) {
    throw new HttpException('El libro ya está en préstamo', HttpStatus.BAD_REQUEST);
  }

  const socio = await this.socioRepository.findOne({
    where: { socioId: createPrestamoDto.socio.socioId },
    relations: ['prestamos'],
  });

  const prestamosActivos = socio.prestamos.filter(
    (prestamo) => prestamo.fechaDevolucion === null,
  );

  if (prestamosActivos.length >= 5) {
    throw new HttpException('El socio ya tiene demasiados préstamos activos', HttpStatus.BAD_REQUEST);
  }

  const nuevoPrestamo = this.prestamoRepository.create({
    libro: { libroId: createPrestamoDto.libro.libroId },  // Asumiendo que "libro" es una relación
    socio: { socioId: createPrestamoDto.socio.socioId },  // Asumiendo que "socio" es una relación
    fechaPrestamo: createPrestamoDto.fechaPrestamo,
    fechaDevolucion: createPrestamoDto.fechaDevolucion,
    devuelto: false,
  });
  
  // Guardar el nuevo préstamo en la base de datos
  await this.prestamoRepository.save(nuevoPrestamo);
  
  return nuevoPrestamo;
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
