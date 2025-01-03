import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';
import { PagoService } from 'src/pagos/pagos.service'; 

@Injectable()
export class SociosService {

  constructor(@InjectRepository(Socio) private readonly socioRepository: Repository<Socio>, private readonly pagoService: PagoService,) {}

  async create(createSocioDto: CreateSocioDto) {
    const userFound = await this.socioRepository.findOne({
      where:{
          nombre: createSocioDto.nombre
      }
    })
    if(userFound){
      throw new HttpException('El Socio ya existe. Prueba nuevamente.', HttpStatus.CONFLICT)
    }
    const newSocio = this.socioRepository.create(createSocioDto);
    const socioCreado = await this.socioRepository.save(newSocio);
    await this.pagoService.crearPagoInicial({socioId: socioCreado.socioId, monto:1000});

    return socioCreado;
  }

  findAll() {
    return this.socioRepository.find();
  }

  async findOne(id: number): Promise<Socio> {
    const socio = await this.socioRepository.findOneBy({ socioId: id });
    if (!socio) {
      throw new HttpException('Socio no encontrado', HttpStatus.NOT_FOUND);
    }
    return socio;
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
      throw new HttpException('Socio no encontrado', HttpStatus.NOT_FOUND);
    }
    socio.eliminado = true;  // Borrado lógico
    await this.socioRepository.save(socio);
  }
}
