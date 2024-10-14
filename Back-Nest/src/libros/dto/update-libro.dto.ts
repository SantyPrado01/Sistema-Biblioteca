import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
    titulo?: string
    autor?: string
    categoria?: string
    disponible?: boolean
}
