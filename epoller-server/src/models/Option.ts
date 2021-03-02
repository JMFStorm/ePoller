import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Poll from "./Poll";

// Option model
@Entity("options")
export default class Option extends BaseEntity {
  // Primary key id
  @PrimaryGeneratedColumn()
  optionId: number;

  @Column()
  title: string;

  @Column()
  votes: number;

  // Options
  @ManyToOne(() => Poll, (poll) => poll.options, {
    onDelete: "CASCADE",
  })
  poll: Poll;
}
