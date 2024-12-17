import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "./src/index.ts"),
            name: "qubic-react-ui",
            fileName: function (format) { return "index.".concat(format, ".js"); },
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'clsx',
                'react-router-dom',
                '@qubic-lib/qubic-ts-library',
                'tailwindcss',
                '@qubic-lib/qubic-ts-vault-library',
                '@metamask/providers',
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
    },
    plugins: [
      react(),
      dts({ rollupTypes: true }),
      svgr(),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
    server: {
      fs: {
        strict: true, // Disallow file imports outside the project root
      },
    },
});
