
import { defineConfig, type Plugin } from 'vite';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

function compressAssets(): Plugin {
  return {
    name: 'compress-assets',
    apply: 'build',

    generateBundle(_options, bundle) {
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (!fileName.endsWith('.js')) continue;

        const source =
          asset.type === 'asset'
            ? asset.source
            : asset.code;

        const buffer = Buffer.isBuffer(source)
          ? source
          : Buffer.from(source);

        this.emitFile({
          type: 'asset',
          fileName: `${fileName}.gz`,
          source: gzipSync(buffer),
        });

        this.emitFile({
          type: 'asset',
          fileName: `${fileName}.br`,
          source: brotliCompressSync(buffer),
        });
      }
    },
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index-[hash].js',
      },
    },
  },
  plugins: [compressAssets()],
});
