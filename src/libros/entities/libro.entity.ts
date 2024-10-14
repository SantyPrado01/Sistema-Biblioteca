import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prestamo } from '../../prestamos/entities/prestamo.entity';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  libroId: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  categoria: string;

  @Column({ default: true })
  disponible: boolean;

  @OneToMany(() => Prestamo, prestamo => prestamo.libro)
  prestamos: Prestamo[];

  @Column({default: false})
  eliminado: boolean;
}
