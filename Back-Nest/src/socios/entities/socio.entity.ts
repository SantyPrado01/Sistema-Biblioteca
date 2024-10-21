import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prestamo } from '../../prestamos/entities/prestamo.entity';
import { Pago } from 'src/pagos/entities/pagos.entity';

@Entity()
export class Socio {
  
  @PrimaryGeneratedColumn()
  socioId: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @OneToMany(() => Prestamo, prestamo => prestamo.socio)
  prestamos: Prestamo[];

  @Column({default:false})
  eliminado: boolean;

  @OneToMany(() => Pago, pago => pago.socio)
  pagos: Pago[];

}
