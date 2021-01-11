import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { User } from "./Users";

export enum chatRecordFrom {
  USER,
  CUSTOMER
}

@Entity({
  name: 'chat_record'
})
export class ChatRecord extends BaseEntity {
  constructor(content, userId, customerId, from, date, isRead) {
    super();
    this.content = content;
    this.user = userId;
    this.customer = customerId;
    this.from = from;
    this.date = date;
    this.isRead = isRead;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @ManyToOne(type => User, user => user.id, {
    nullable: false
  })
  user: number;

  @ManyToOne(type => Customer, customer => customer.id, {
    nullable: false
  })
  customer: number;

  @Column({
    type: 'enum',
    enum: chatRecordFrom
  })
  from: 0 | 1;

  @Column()
  date: string;

  @Column({
    default: 0
  })
  isRead: 0 | 1;
}