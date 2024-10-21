import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pagos.entity'; 
import { CreatePagoDto } from './dto/create-pagos.dto';
import { UpdatePagoDto } from './dto/update-pagos.dto';
import { Socio } from 'src/socios/entities/socio.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
    @InjectRepository(Socio) private socioRepository: Repository<Socio>,
  ) {}

  // Crear el pago inicial para un socio
  async crearPagoInicial(createPagoDto: CreatePagoDto): Promise<Pago> {
    const socio = await this.socioRepository.findOne({ where: { socioId: createPagoDto.socioId } });
    if (!socio) {
      throw new HttpException('Socio no encontrado', HttpStatus.NOT_FOUND);
    }

    const fechaFacturacion = new Date();
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaFacturacion.getDate() + 10); // Plazo de 10 días para el pago inicial

    const pagoInicial = this.pagoRepository.create({
      socio: socio,
      monto: createPagoDto.monto || 1000,  // Usa el monto del DTO o uno por defecto
      fechaFacturacion: fechaFacturacion,
      fechaVencimiento: fechaVencimiento,
      pagado: false,
    });

    await this.pagoRepository.save(pagoInicial);

    // Generar los pagos mensuales por adelantado
    await this.generarPagosMensuales(socio);

    return pagoInicial;
  }

  // Generar pagos mensuales para el socio
  async generarPagosMensuales(socio: Socio): Promise<void> {
    const pagosFuturos: Pago[] = [];
    const fechaInicio = new Date(); 
    const cantidadMeses = 11; 

    for (let i = 1; i <= cantidadMeses; i++) {
      const nuevaFechaFacturacion = new Date(fechaInicio);
      nuevaFechaFacturacion.setMonth(nuevaFechaFacturacion.getMonth() + i); 

      const nuevaFechaVencimiento = new Date(nuevaFechaFacturacion);
      nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 10); 

      const nuevoPago = this.pagoRepository.create({
        socio: socio,
        monto: 1000, 
        fechaFacturacion: nuevaFechaFacturacion,
        fechaVencimiento: nuevaFechaVencimiento,
        pagado: false,
      });

      pagosFuturos.push(nuevoPago);
    }

    await this.pagoRepository.save(pagosFuturos);
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find({ relations: ['socio'] });
  }

  async findPagosBySocio(socioId: number): Promise<Pago[]> {
    return this.pagoRepository.find({ where: { socio: { socioId } }, relations: ['socio'] });
  }

  async findOne(id: number): Promise<Pago> {
    return this.pagoRepository.findOne({ where: { pagoId: id }, relations: ['socio'] });
  }

  async actualizarPago(pagoId: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const fechaPago = new Date();
    const pago = await this.pagoRepository.findOne({ where: { pagoId } });
  
    if (!pago) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
  
    Object.assign(pago, {
      ...updatePagoDto,
      fechaPago,  
    });
  
    return this.pagoRepository.save(pago);  // Guarda el objeto actualizado
  }
}
