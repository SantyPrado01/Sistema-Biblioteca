import { CreateUsuarioDto } from './create-usuario.dto';
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    nombreUsuario?: string;
    contrasena?: string;
    rol?: string;
    eliminado?: boolean;
}
export {};
