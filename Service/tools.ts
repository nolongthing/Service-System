import { ValidationError } from "class-validator";

/**
 * model 实例数据验证错误数组信息的处理
 * @param errArr validator错误数组
 */
export function getValidateError(errArr: ValidationError[]) {
  return errArr.map(item => {
    return Object.values(item.constraints);
  }).flat();
}