import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    nombreUsuario?: string;
    contrasena?: string;
    rol?: string;
    eliminado?: boolean;
}
