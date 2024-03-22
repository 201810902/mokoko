import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import { env } from "node:process";

// const isDev = env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
	// base: "/mokoko/",
	plugins: [react()],
	css: {
		devSourcemap: true,
	},

	//빌드 시, 청크 파일 생성 메뉴얼 구성 (? ..)
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					reactRouter: ["react-router-dom"],
					extra: ["@tanstack/react-query"],
				},
			},
		},
	},
});
