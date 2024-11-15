import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import imp from 'vite-plugin-imp'

export default defineConfig({
  plugins: [
    react(),
  ,
    imp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
        },
      },
    },
  },
})
