import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PREFIX } from '../../config/constant';
import { getToken } from './auth';
import { useMessage } from '../hooks/useMessage';
import { router } from '/@/router';

const { createMessage } = useMessage();
// baseURL
const BASE_URL = import.meta.env.MODE === 'development' ? API_PREFIX : '';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// 请求拦截
instance.interceptors.request.use(
  (config: any) => {
    // 请求头 token配置
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    const code = response.data.code;
    if (['90000', '0', 'success', '200'].includes(code)) {
      return response;
    } else {
      createMessage.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
  },
  (err) => {
    let errMsg = '';
    if (err && err.response) {
    } else {
      errMsg = err.data.error || err.data.message || err.data.msg;
      switch (err.response.status) {
        case 401:
          errMsg = '登录状态失效，请重新登录';
          // sessionStorage.removeItem('token');
          router.push('/login');
          break;
        case 403:
          errMsg = '拒绝访问';
          break;
        case 408:
          errMsg = '请求超时';
          break;
        case 500:
          errMsg = '服务器内部错误';
          break;
        case 501:
          errMsg = '服务未实现';
          break;
        case 502:
          errMsg = '网关错误';
          break;
        case 503:
          errMsg = '服务不可用';
          break;
        case 504:
          errMsg = '网关超时';
          break;
        case 505:
          errMsg = 'HTTP版本不受支持';
          break;
        default:
          errMsg = err.response.data.error || err.response.data.message || err.response.data.msg;
          break;
      }
    }
    createMessage.error(errMsg);
    return Promise.reject(errMsg);
  },
);

const request = <T = any>(
  config: AxiosRequestConfig | string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      });
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      });
    }
  } else {
    return instance.request<T, T>(config);
  }
};
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options);
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
