import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // setupFiles: ['test/fixtures/mocked-env.ts', 'test/fixtures/mocked-modules.ts'],
    watch: false,
    coverage: {
      all: true,
      enabled: true,
      include: ['src/entities/**', 'src/shared/utils.ts'],
      // lines: 100,
      // statements: 100,
      // functions: 100,
      // branches: 95,
    },
  },
});
