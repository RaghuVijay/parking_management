import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParkingStatusType } from './enums/parking-statusType.enum';

@Entity('parking_sessions')
export class ParkingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    default: () => 'uuid_generate_v4()', // PostgreSQL function to generate UUIDs
  })
  session_id: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  vehicle_code: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  customer_code: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  level_code: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ParkingStatusType,
  })
  status: ParkingStatusType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
