import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true, // 클라이언트 → 서버 요청 시, 쿠키·인증 정보(자격 증명)를 함께 전송하도록 하는 옵션
});
