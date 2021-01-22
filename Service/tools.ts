import { ValidationError } from "class-validator";

export enum ErrorCode {
  'SUCCESS' = 0,
  'ER_DUP_ENTRY' = 1062,
  'VALIDATE_ERROR' = 1063,
  'LOGIN_FAILED' = -1
}

/**
 * model 实例数据验证错误数组信息的处理
 * @param errArr validator错误数组
 */
export function getValidateError(errArr: ValidationError[]) {
  return {
    code: ErrorCode.VALIDATE_ERROR,
    message: errArr.map(item => {
      return Object.values(item.constraints);
    }).flat()
  }
}

/**
 * 处理接口返回错误的信息
 * @param error 错误信息
 */
export function createErrorMessage(error) {
  return {
    code: ErrorCode[error.code] || 500,
    message: error.message,
  }
}

/**
 * 处理接口返回成功的信息
 * @param result 
 */
export function createSuccessData(data: object) {
  return {
    code: ErrorCode.SUCCESS,
    data,
  }
}


export function parseCookie<T extends object>(cookieStr: string): T {
  const cookies = {};
  cookieStr.split(';').forEach(item => {
    const temp = item.split('=');
    cookies[temp[0].trim()] = temp[1].trim();
  })
  return cookies as T;
}

function getRandom() {
  return Math.random().toString(36).slice(-6);
}


export const key = getRandom();