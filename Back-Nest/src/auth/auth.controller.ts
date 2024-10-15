import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()registerDto: CreateUsuarioDto,
    ){
        return this.authService.register(registerDto)
    };

    @Post('login')
    loging(@Body() loginDto: loginDto){
        return this.authService.login(loginDto);
    }
}
