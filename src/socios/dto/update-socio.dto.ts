import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioDto } from './create-socio.dto';

export class UpdateSocioDto extends PartialType(CreateSocioDto) {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
}
