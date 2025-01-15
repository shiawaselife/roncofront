import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Vite 등에서 /api로 프록시 연결 가정
});

// 문제 목록 불러오기
export const fetchProblems = async () => {
  const response = await axiosInstance.get('/problems');
  return response.data;
};

// 특정 학생(phone) + 문제ID의 코드 불러오기
export const fetchUserCode = async (phone, problemId) => {
  const response = await axiosInstance.get(`/code/${phone}/${problemId}`);
  return response.data; // { code: '...' }
};

// 코드 실행
export const executeCode = async (code, input = '') => {
  // 백엔드에 code + input 함께 전송
  const response = await axiosInstance.post('/code/execute', { code, input })
  return response.data
}

// 코드 저장
export const saveCodeToServer = async (phone, problemId, code) => {
  // POST /code/save  body: { phone, problemId, code }
  const response = await axiosInstance.post('/code/save', {
    phone,
    problemId,
    code,
  });
  return response.data; // { message: '...' }
};
