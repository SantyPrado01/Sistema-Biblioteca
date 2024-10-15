import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { loginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: CreateUsuarioDto): Promise<import("../usuarios/entities/usuario.entity").Usuario>;
    loging(loginDto: loginDto): Promise<import("@nestjs/common").HttpException | {
        token: string;
        username: string;
        role: string;
    }>;
}
