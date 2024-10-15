import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { loginDto } from './dto/login.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usuarioService;
    constructor(authService: AuthService, usuarioService: UsuariosService);
    register(registerDto: CreateUsuarioDto): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
    login(loginDto: loginDto): Promise<import("@nestjs/common").HttpException | {
        token: string;
        username: string;
        role: string;
    }>;
    findAll(): Promise<import("../usuarios/entities/usuario.entity").Usuario[]>;
    findOne(id: string): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
}
