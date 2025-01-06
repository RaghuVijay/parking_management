import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleType } from './enums/VehicleTypes.enum';
import { operatortype } from './enums/operatorType.enum';

@Entity('parking_fee')
@Unique(['code'])
export class Parkingfee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    default: () =>
      `CONCAT('CAP' || TO_CHAR(NEXTVAL('capacity_seq'), 'FM0000'))`,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  mall_code: string;

  @Column({
    nullable: false,
    enum: VehicleType,
  })
  type: VehicleType;

  @Column({
    type: 'int2',
    nullable: false,
  })
  duration: number;

  @Column({
    nullable: false,
    enum: operatortype,
  })
  operator: operatortype;

  @Column({
    type: 'int2',
    nullable: false,
  })
  cost: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
