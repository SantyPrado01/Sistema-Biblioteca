import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { loginDto } from './dto/login.dto';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsuariosService, jwtService: JwtService);
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
    register({ nombreUsuario, contrasena, rol, eliminado }: CreateUsuarioDto): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
    login({ nombreUsuario, contrasena }: loginDto): Promise<HttpException | {
        token: string;
        username: string;
        role: string;
    }>;
}
