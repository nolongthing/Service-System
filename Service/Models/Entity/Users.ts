import { IsHash, Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export interface IUser {
  password: string,
  username?: string,
  phone: string
}

@Entity()
export class User extends BaseEntity implements IUser {
  constructor(password: string, username: string, phone: string) {
    super();
    this.password = password;
    this.username = username;
    this.phone = phone;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 5, {
    message: "用户名长度错误，请修改至1-5个字符之间"
  })
  @Column()
  username: string;

  @Column({
    length: 11,
    unique: true
  })
  phone: string;

  @IsHash("md5", {
    message: "用户密码请传递md5字符串"
  })
  @Column()
  password: string;
}