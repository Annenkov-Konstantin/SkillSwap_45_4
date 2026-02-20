import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Основной алиас для src
      '@': path.resolve(__dirname, './src'),
      // Дополнительные алиасы для удобства
      '@app': path.resolve(__dirname, './src/app'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api': path.resolve(__dirname, './src/api'),
      '@images': path.resolve(__dirname, './src/images'),
      '@slices': path.resolve(__dirname, './src/services/slices'),
      '@slice': path.resolve(__dirname, './src/services/slices/'),
      '@selectors': path.resolve(__dirname, './src/services/selectors'),
      '@store-hooks': path.resolve(__dirname, './src/services/hooks'),
      '@thunks': path.resolve(__dirname, 'src/services/thunk'),
      '@constants': path.resolve(__dirname, 'src/shared/lib/constants'),
      '@types': path.resolve(__dirname, 'src/shared/lib/types')
    }
  },
  server: {
    port: 4000,
    open: true, // автоматически открывать браузер
  },
});
