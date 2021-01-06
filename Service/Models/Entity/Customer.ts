import { IsHash, Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Customer extends BaseEntity  {
  constructor(password: string, customerName: string, account: string) {
    super();
    this.password = password;
    this.customer_name = customerName;
    this.account = account;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 5, {
    message: "用户名长度错误，请修改至1-5个字符之间"
  })
  @Column()
  customer_name: string;

  @Length(6, 12, {
    message: "账号长度错误，请修改至6-12个字符之间"
  })
  @Column({
    unique: true
  })
  account: string;

  @IsHash("md5", {
    message: "用户密码请传递md5字符串"
  })
  @Column()
  password: string;
}