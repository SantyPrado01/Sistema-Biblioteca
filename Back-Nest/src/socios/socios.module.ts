import { forwardRef, Module } from '@nestjs/common';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { Socio } from './entities/socio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoModule } from 'src/pagos/pagos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Socio]), PagoModule],
  controllers: [SociosController],
  providers: [SociosService],
  exports:[TypeOrmModule, SociosModule]
})
export class SociosModule {}
