import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SociosModule } from './socios/socios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password:'Nfr06950', //1008 en Windows //Nfr06950 en Mac
      database: 'corsacorsql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //Podemos leer cualquier archivo entity
      synchronize:true,
    }),
    LibrosModule, 
    SociosModule, 
    PrestamosModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
