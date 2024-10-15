"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register({ nombreUsuario, contrasena, rol, eliminado }) {
        const user = await this.userService.getUsername(nombreUsuario);
        if (user) {
            throw new common_1.HttpException('El usuario ya existe', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const createUserDto = {
            nombreUsuario,
            contrasena: hashedPassword,
            rol,
            eliminado
        };
        return await this.userService.create(createUserDto);
    }
    async login({ nombreUsuario, contrasena }) {
        const user = await this.userService.getUsername(nombreUsuario);
        if (!user) {
            return new common_1.HttpException('Usuario no Existente', common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return new common_1.HttpException('Contraseña Incorrecta', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const payload = { username: user.nombreUsuario, role: user.rol };
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            username: user.nombreUsuario,
            role: user.rol
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map