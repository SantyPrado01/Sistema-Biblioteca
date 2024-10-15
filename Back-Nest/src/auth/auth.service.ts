import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsuariosService,
        private readonly jwtService: JwtService
    ){}

    async register({ nombreUsuario, contrasena, rol, eliminado }: CreateUsuarioDto) {
        const user = await this.userService.getUsername(nombreUsuario);
    
        if (user) {
          throw new HttpException('El usuario ya existe', HttpStatus.NOT_ACCEPTABLE);
        }
    
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const createUserDto: CreateUsuarioDto = {
            nombreUsuario,
          contrasena: hashedPassword,
          rol,
          eliminado
    
        };
    
        return await this.userService.create(createUserDto);
      }

    async login({nombreUsuario, contrasena}: loginDto){
        const user = await this.userService.getUsername(nombreUsuario);

        if (!user){
            return new HttpException('Usuario no Existente', HttpStatus.NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

        if(!isPasswordValid){
            return new HttpException('Contraseña Incorrecta', HttpStatus.NOT_ACCEPTABLE)
        }

        const payload = { username: user.nombreUsuario, role: user.rol };

        const token = await this.jwtService.signAsync(payload)

        return {
            token, 
            username: user.nombreUsuario,
            role: user.rol 
        };
    }
}