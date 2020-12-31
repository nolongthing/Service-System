import { IUser, User } from "@model/Entity/Users";
import { validate } from "class-validator";
import { getValidateError } from "tools";

class UserService {
  /**
   * 用户注册服务
   * @param Object userInfo 包含用户名、手机号、MD5格式密码的对象
   */
  async register(userInfo: IUser) {
    const { password, username, phone } = userInfo;
    const user = new User(password, username, phone);
    //验证数据是否正确
    const errors = await validate(user);
    if (errors.length > 0) {
      return getValidateError(errors);
    }
    //注册用户信息插入数据库
    try {
      const result = await user.save();
      return {
        message: 'success',
        userId: result.id
      }
    } catch (error) {
      return {
        message: 'failed',
        error: error.message,
      }
    }
  }

  /**
   * 查询用户登陆信息
   */
  async getUserAccount() {

  }
}

export const userService = new UserService();