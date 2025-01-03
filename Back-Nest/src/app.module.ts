import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SociosModule } from './socios/socios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PagoModule } from './pagos/pagos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password:'Nfr06950', //1008 en Windows //Nfr06950 en Mac
      database: 'biblioteca',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //Podemos leer cualquier archivo entity
      synchronize:true,
    }),
    LibrosModule, 
    SociosModule, 
    PrestamosModule, 
    UsuariosModule, 
    AuthModule, 
    PagoModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
