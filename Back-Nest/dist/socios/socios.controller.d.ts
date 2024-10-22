import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
export declare class SociosController {
    private readonly sociosService;
    constructor(sociosService: SociosService);
    create(createSocioDto: CreateSocioDto): Promise<import("./entities/socio.entity").Socio | import("@nestjs/common").HttpException>;
    findAll(): Promise<import("./entities/socio.entity").Socio[]>;
    findOne(id: string): Promise<import("./entities/socio.entity").Socio>;
    update(id: string, updateSocioDto: UpdateSocioDto): Promise<import("./entities/socio.entity").Socio>;
    remove(id: string): Promise<void>;
}
