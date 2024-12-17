import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "qubic-react-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'clsx',
        'react-router-dom',
        '@qubic-lib/qubic-ts-library',
        'tailwindcss',
        '@qubic-lib/qubic-ts-vault-library'
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false, // Disable minification to preserve console logs
    terserOptions: {
      compress: {
        drop_console: false, // Preserve console logs
        pure_funcs: [] // Don't remove any functions
      },
      mangle: false // Don't mangle variable names
    }
  },
  plugins: [react(), dts({ rollupTypes: true })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
