import { Customer } from "@model/Entity/Customer";
import { validate } from "class-validator";
import { sign } from "jsonwebtoken";
import { createErrorMessage, createSuccessData, getValidateError, key } from "tools";

class CustomerService {
  /**
   * 客服注册服务
   * @param Object userInfo 包含客服名、账号、MD5格式密码的对象
   */
  async register(customerInfo) {
    const { password, customerName, account } = customerInfo;
    const customer = new Customer(password, customerName, account);
    //验证数据是否正确
    const errors = await validate(customer);
    if (errors.length > 0) {
      return getValidateError(errors);
    }
    //注册用户信息插入数据库
    try {
      const result = await customer.save();
      return createSuccessData({ customerId: result.id });
    } catch (error) {
      return createErrorMessage(error);
    }
  }

  /**
   * 查询用户登陆信息
   */
  async getCustomerAccount(customerInfo) {
    try {
      if (!customerInfo.password || !customerInfo.account) {
        return createSuccessData({});
      }
      const result = await Customer.findOne({
        password: customerInfo.password,
        account: customerInfo.account
      });
      if (result && result.id) {
        //返回登录token;
        delete result.password;
        const token = sign({ ...result }, key);
        return token
      } else {
        return createSuccessData({});
      }
    } catch (error) {
      return createErrorMessage(error);
    }
  }

  async getCustomerList() {
    try {
      const result = await Customer
        .createQueryBuilder('customer')
        .select(['customer.id', 'customer.customer_name'])
        .getMany()
      return createSuccessData(result);
    } catch (error) {
      return createErrorMessage(error);
    }
  }
}

export const customerService = new CustomerService();