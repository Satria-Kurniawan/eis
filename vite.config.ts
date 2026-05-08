import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === "SOURCEMAP_ERROR") {
            return;
          }
          defaultHandler(warning);
        },
      },
    },
    server: {
      allowedHosts: ["localhost", "eis-alpha-dev.undiksha.ac.id"],
      port: 5174,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "https://service-eis.dwiproject.xyz",
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
      allowedHosts: ["localhost", "eis-alpha-dev.undiksha.ac.id"],
    },
  };
});
