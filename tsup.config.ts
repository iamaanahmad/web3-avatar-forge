import { defineConfig } from 'tsup';
import { copy } from 'esbuild-plugin-copy';

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [
    copy({
      // this is the issue related to that
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/README.md'],
        to: ['./dist/README.md'],
      },
    }),
  ],
});
