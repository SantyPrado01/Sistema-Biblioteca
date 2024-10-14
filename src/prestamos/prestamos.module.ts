import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SociosController } from 'src/socios/socios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo]),SociosController],
  controllers: [PrestamosController],
  providers: [PrestamosService],
})
export class PrestamosModule {}
