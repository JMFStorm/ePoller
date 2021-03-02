import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import Option from "./Option";

// Poll model
@Entity("polls")
export default class Poll extends BaseEntity {
  // Primary key id
  @PrimaryGeneratedColumn()
  pollId: number;

  @Column()
  title: string;

  // Options
  @OneToMany(() => Option, (option) => option.poll, {
    onDelete: "CASCADE",
  })
  options: Option[];
}
