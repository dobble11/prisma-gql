/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    host: true,
    port: 3010,
  },
  test: {
    environment: 'jsdom',
    watch: false,
    coverage: {
      provider: 'v8',
      all: true,
      enabled: true,
      include: ['src/shared/utils.ts'],
      thresholds: {
        lines: 100,
        statements: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
