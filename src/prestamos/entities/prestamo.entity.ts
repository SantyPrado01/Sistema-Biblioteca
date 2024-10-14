import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';
import { Socio } from '../../socios/entities/socio.entity';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  prestamoId: number;

  @ManyToOne(() => Libro, libro => libro.prestamos)
  libro: Libro;

  @ManyToOne(() => Socio, socio => socio.prestamos)
  socio: Socio;

  @Column()
  fechaPrestamo: Date;

  @Column({ nullable: true })
  fechaDevolucion: Date;

  @Column({ default: false })
  devuelto: boolean;
}
