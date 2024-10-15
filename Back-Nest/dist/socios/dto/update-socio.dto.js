"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSocioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_socio_dto_1 = require("./create-socio.dto");
class UpdateSocioDto extends (0, mapped_types_1.PartialType)(create_socio_dto_1.CreateSocioDto) {
}
exports.UpdateSocioDto = UpdateSocioDto;
//# sourceMappingURL=update-socio.dto.js.map