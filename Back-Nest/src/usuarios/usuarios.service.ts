import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { nombreUsuario: createUsuarioDto.nombreUsuario },
    });

    if (usuarioExistente) {
      throw new HttpException('El nombre de usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ usuarioId: id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ usuarioId: id });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const socio = await this.usuarioRepository.findOneBy({ usuarioId: id });
    if (!socio) {
      throw new Error('Socio no encontrado');
    }
    socio.eliminado = true;  // Borrado lógico
    await this.usuarioRepository.save(socio);
  }

  async getUsername(nombreUsuario:string){

    const userFound =await this.usuarioRepository.findOne({
        where:{
            nombreUsuario
        }
    })

    if (!userFound){
        return null;
    }
    return userFound
}
}
