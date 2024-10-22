import { CreateLibroDto } from './create-libro.dto';
declare const UpdateLibroDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLibroDto>>;
export declare class UpdateLibroDto extends UpdateLibroDto_base {
    titulo?: string;
    autor?: string;
    categoria?: string;
    disponible?: boolean;
    eliminado?: boolean;
}
export {};
