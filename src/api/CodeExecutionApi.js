import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: '/api'
});

export const fetchProblems = async () => {
 const response = await axiosInstance.get('/problems');
 return response.data;
};

export const fetchUserCode = async (studentId, problemId) => {
 const response = await axiosInstance.get(`/code/${studentId}/${problemId}`);
 return response.data;
};

export const executeCode = async (code, input = '') => {
 const response = await axiosInstance.post('/code/execute', { code, input })
 return response.data; 
};

export const saveCodeToServer = async (studentId, problemId, code) => {
 const response = await axiosInstance.post('/code/save', {
   studentId,
   problemId,
   code,
 });
 return response.data;
};  