import { http } from '/@/utils/http';

const DevBase = import.meta.env.MODE == 'development' ? '/api' : '';
const URL = {
  get_imgCode: DevBase + '/vms/system/user/verifyCode?captchaId=',
  post_login: DevBase + '/vms/system/user/login',
};

// 用户获取图形验证码
export function get_imgCode(params) {
  return URL.get_imgCode + params;
}

// 用户登录获取token
export function post_login(params) {
  return http.post(URL.post_login, params, {
    headers: { 'Content-Type': 'application/json', token_permanent: '1' },
  });
}
