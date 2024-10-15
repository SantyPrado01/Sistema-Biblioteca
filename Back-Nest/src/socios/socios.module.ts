import { Module } from '@nestjs/common';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { Socio } from './entities/socio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Socio])],
  controllers: [SociosController],
  providers: [SociosService],
  exports:[TypeOrmModule]
})
export class SociosModule {}
