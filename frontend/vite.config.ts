import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen on all interfaces (WSL2 / LAN access)
    port: 3000, // dev server port
    strictPort: true, // error if port is already in use
  },
});
