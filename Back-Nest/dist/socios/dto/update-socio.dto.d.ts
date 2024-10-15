import { CreateSocioDto } from './create-socio.dto';
declare const UpdateSocioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSocioDto>>;
export declare class UpdateSocioDto extends UpdateSocioDto_base {
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
}
export {};
