import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    usuarioId: number;
  
    @Column({ unique: true })
    nombreUsuario: string;
  
    @Column()
    contrasena: string;

    @Column()
    rol: string;
  
    @Column({ default: false })
    eliminado: boolean;

}
