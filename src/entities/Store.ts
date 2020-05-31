import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CoordDinatesTransformer } from "../transformers/coordTransformer";
@Entity()
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  is_open?: boolean;

  @Column("numeric", {
    precision: 8,
    scale: 3,
    nullable: false,
    transformer: new CoordDinatesTransformer(),
  })
  public latitude: number;

  @Column("numeric", {
    precision: 8,
    scale: 3,
    nullable: false,
    transformer: new CoordDinatesTransformer(),
  })
  public longitude: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;
}
