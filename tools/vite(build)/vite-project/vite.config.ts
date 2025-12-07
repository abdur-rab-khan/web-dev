import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: "/",
    cors: {
      origin: "http://localhost:4000",
    },
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    https: {
      key: fs.readFileSync("./certs/localhost-key.pem"),
      cert: fs.readFileSync("./certs/localhost.pem"),
    },
  },
  build: {},
  plugins: [
    react(),
    // basicSsl({
    //   name: "test-cert",
    //   domains: ["localhost"],
    //   certDir: "./certs",
    // }),
  ],
});
