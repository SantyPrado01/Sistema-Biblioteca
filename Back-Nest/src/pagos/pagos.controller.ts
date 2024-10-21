import { Controller, Get, Post, Param, Patch, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PagoService } from './pagos.service'; 
import { Pago } from './entities/pagos.entity'; 
import { CreatePagoDto } from './dto/create-pagos.dto';  // DTO para la creación de pagos
import { UpdatePagoDto } from './dto/update-pagos.dto';  // DTO para la actualización de pagos

@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  // Crear un nuevo pago manualmente (se genera automáticamente con el socio, pero esta opción queda por si acaso)
  @Post()
  async createPago(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      const nuevoPago = await this.pagoService.crearPagoInicial(createPagoDto);
      return nuevoPago;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Obtener todos los pagos
  @Get()
  async findAll(): Promise<Pago[]> {
    return this.pagoService.findAll();
  }

  // Obtener todos los pagos de un socio específico
  @Get('/socio/:id')
  async findPagosBySocio(@Param('id') socioId: number): Promise<Pago[]> {
    return this.pagoService.findPagosBySocio(socioId);
  }

  // Obtener un pago específico por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pago> {
    const pago = await this.pagoService.findOne(id);
    if (!pago) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    return pago;
  }

  // Actualizar el estado de un pago (por ejemplo, marcarlo como pagado)
  @Patch(':id')
  async actualizarPago(@Param('id') id: number, @Body() updatePagoDto: UpdatePagoDto): Promise<Pago> {
    try {
      const pagoActualizado = await this.pagoService.actualizarPago(id, updatePagoDto);
      return pagoActualizado;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
