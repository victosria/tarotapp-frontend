import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Note: removed external preset. Add project-specific Vite configuration here as needed.
});
