import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const peerDependencies = ["react", "react-dom", "react-router-dom", "styled-components", "air-datepicker"];
const isExternal = (id) => peerDependencies.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));

export default defineConfig({
    plugins: [react()],
    publicDir: false,
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: "dist-lib",
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
            formats: ["es"],
            fileName: "index",
        },
        rollupOptions: {
            external: isExternal,
            output: {
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
});
