import {AxiosHeaderValue} from 'axios';
import {axiosInstance} from '@/services/axios-instance';

type ContentType =
  | AxiosHeaderValue
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';

type RawAxiosRequestHeaders = {
  // [x: string]: AxiosHeaderValue | undefined;
  Accept?: AxiosHeaderValue | undefined;
  'Content-Length'?: AxiosHeaderValue | undefined;
  'User-Agent'?: AxiosHeaderValue | undefined;
  'Content-Encoding'?: AxiosHeaderValue | undefined;
  Authorization?: AxiosHeaderValue | undefined;
  'Content-Type'?: ContentType | undefined;
};
export const setAxiosHeader = (
  key: keyof RawAxiosRequestHeaders,
  value: string,
) => {
  axiosInstance.defaults.headers.common[key] = value;
};

export const removeAxiosHeader = (key: keyof RawAxiosRequestHeaders) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};
