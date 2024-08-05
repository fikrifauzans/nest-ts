import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nama', type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ name: "nomor", type: 'int', nullable: true })
  number: number;

  @Column({ name: "jabatan", type: 'varchar', length: 255, nullable: true })
  position: string;

  @Column({ name: "departemen", type: 'varchar', length: 255, nullable: true })
  department: string;

  @Column({ name: "tanggal_masuk", type: 'date', nullable: true })
  joinDate: Date;

  @Column({ name: "foto", type: 'varchar', length: 255, nullable: true })
  photo?: string;

  @Column({ name: "foto_path", type: 'varchar', length: 255, nullable: true })
  photoPath?: string;

  @Column({ name: "status", type: 'varchar', length: 50, nullable: true })
  status: string;
}
