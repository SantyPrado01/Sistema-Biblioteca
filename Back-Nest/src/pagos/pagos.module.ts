import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pagos.entity'; 
import { PagoService } from './pagos.service'; 
import { PagoController } from './pagos.controller'; 
import { Socio } from 'src/socios/entities/socio.entity'; 
import { SociosModule } from 'src/socios/socios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Socio])],
  providers: [PagoService],
  controllers: [PagoController],
  exports: [PagoService],
})
export class PagoModule {}
