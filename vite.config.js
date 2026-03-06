import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from 'url';
import svgr from "vite-plugin-svgr"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createAlias = (dirName) => path.resolve(__dirname, `src/${dirName}`);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss,svgr],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": createAlias(""), // src/,项目根目录
      "@components": createAlias("components"), // src/components/，组件专用通道
      "~img": createAlias("assets/images"), // src/assets/images/, 图片资源通道
      "#types": createAlias("types"), // src/types/, 类型定义通道
    }
  }
})
