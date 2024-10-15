import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SociosService {

  constructor(@InjectRepository(Socio) private readonly socioRepository: Repository<Socio>) {}

  async create(createSocioDto: CreateSocioDto) {
    const userFound = await this.socioRepository.findOne({
      where:{
          nombre: createSocioDto.nombre
      }
    })
    if (userFound){
      return new HttpException('El Socio ya existe. Prueba nuevamente.', HttpStatus.CONFLICT)
    }
  }

  findAll() {
    return this.socioRepository.find();
  }

  findOne(id: number) {
    return this.socioRepository.findOneBy({ socioId: id });
  }

  async update(id: number, updateSocioDto: UpdateSocioDto): Promise<Socio> {
    const socio = await this.socioRepository.findOneBy({ socioId: id });
    if (!socio) {
      throw new HttpException('Socio no encontrado', HttpStatus.NOT_FOUND);
    }
    Object.assign(socio, updateSocioDto);
    return this.socioRepository.save(socio);
  }

  async remove(id: number): Promise<void> {
    const socio = await this.socioRepository.findOneBy({ socioId: id });
    if (!socio) {
      throw new Error('Socio no encontrado');
    }
    socio.eliminado = true;  // Borrado lógico
    await this.socioRepository.save(socio);
  }
}
