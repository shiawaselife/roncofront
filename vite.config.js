import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
    port: 5173, // 원하는 포트로 설정 (기본값은 5173)
    strictPort: true, // 포트가 이미 사용 중일 경우 오류 발생
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 URL
        changeOrigin: true, // Origin 헤더 변경
      },
      '/v1/search': {  // 변경된 부분
        target: 'https://openapi.naver.com',
        changeOrigin: true,
      },
      '/ws': {  // WebSocket 연결을 위한 프록시 추가
        target: 'http://localhost:8080',
        ws: true,  // WebSocket 프록시 설정
        changeOrigin: true
      }
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    global: 'window'
  }
});
