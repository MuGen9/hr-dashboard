import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const statuses = ['CLOSED', 'OPEN'] as const;
export type Status = (typeof statuses)[number];

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  shortDescription: string;

  @Column()
  @ApiProperty()
  longDescription: string;

  @Column()
  @ApiProperty()
  logo: string;

  @ApiProperty()
  @Column()
  companyName: string;

  @ApiProperty({ enum: statuses })
  @Column({ default: 'OPEN' })
  status: Status;
}
