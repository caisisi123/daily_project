
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {splitVendorChunkPlugin} from "vite";
//import imagesSharp from 'vite-plugin-images-sharp';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  rollupInputOptions:{
  }
,  plugins: [vue(), AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    splitVendorChunkPlugin(),
      visualizer(),
  /*,
    imagesSharp({
      entry: path.join(__dirname,'./dist/assets'), //入口
      imageType: ['.png', '.jpg'], // 处理图片类型
      sharpType: ['webp'], //生成的格式
      outDir: path.join(__dirname,'/images'), //输出目录
      compileTime: 'after', //编译时机  编译前：before   编译后：after
    })*/],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  watch:{},
  build:{
    outDir:'viteDist',
    manifest:true,
   // sourcemap: true,
    minify:'terser',
    terserOptions:{
      compress: {
        unused: true,
        drop_debugger: true,
        drop_console: true,
    },
  },
    rollupOptions:{
      output:{
        manualChunks(id){
          if(id.includes('node_modules')&&id.includes('element-plus')){
            return 'elementPlus'
          }else if(id.includes('node_modules')){
            return 'vendor'
          }
        }
    }
},},})
