import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Vite 프록시로 '/api' 경로를 백엔드로 라우팅
});

/*
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default {
  getStudents: () => API.get(`/students`),
  getStudentsById: (studentId) => API.get(`/students/${studentId}`),
  createStudent: (data) => API.post('/students', data),
  createStudent: (data) => API.post("/students", data),
  updateStudent: (studentId, data) => API.put(`/students/${studentId}`, data),
  deleteStudent: (studentId) => API.delete(`/students/${studentId}`),
  createPost: (data, boardId) =>
    API.post(`/posts?boardId=${boardId}`, data),
  getPostById: (postId) => API.get(`/posts/${postId}`),
  getCommentsByPostId: (postId) => API.get(`/posts/${postId}/comments`),
  createComment: (postId, content) =>
    API.post(`/posts/${postId}/comments`, { content }),
  markAttendance(studentId) {
    return API.post(`/attendance?studentId=${studentId}`)
  },
  cancelAttendance(studentId) {
    return API.delete(`/attendance?studentId=${studentId}`)
  },
  getTodayAttendance() {
    return API.get('/attendance/today')
  },
  getAttendanceById: (studentId) => API.get(`/attendance/${studentId}`)
};
