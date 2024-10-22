import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Socio } from '../../socios/entities/socio.entity'; 

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  pagoId: number;

  @ManyToOne(() => Socio, socio => socio.pagos)
  socio: Socio;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @CreateDateColumn()  
  fechaFacturacion: Date;

  @Column({ type: 'date' })  
  fechaVencimiento: Date;

  @Column({ type: 'date', nullable: true })  
  fechaPago: Date | null;

  @Column({ default: false })
  pagado: boolean;
}

