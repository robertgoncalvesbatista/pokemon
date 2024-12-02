import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: "/pokemon",
  resolve: {
    alias: {
      "@": "/src", // Define '@' como atalho para o diretório 'src'
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Extensões a serem resolvidas automaticamente
  },
});
