import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

function getSrcPath(src: string) {
    return path.resolve(__dirname, src);
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": getSrcPath("src")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/variables.scss";`
            }
        }
    },
    server: {
        open: true,

    }
})
